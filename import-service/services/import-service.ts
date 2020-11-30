import { StorageService } from './storage-service';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import { SQS } from 'aws-sdk';

export class ImportService {
  private BUCKET_NAME = process.env.PRODUCT_BUCKET_NAME;
  private QUEUE_URL = process.env.QUEUE_URL;
  private UPLOADED_FOLDER_PREFIX = 'uploaded/';
  private storageService: StorageService;
  private sqs: SQS;

  constructor() {
    this.storageService = new StorageService();
    this.sqs = new SQS();
  }

  getSignedUrlPromise(fileName: string): Promise<string> {
    const key = `${ this.UPLOADED_FOLDER_PREFIX }${ fileName }`;
    const contentType = 'text/csv';

    return this.storageService.getSignedUrlPromise(this.BUCKET_NAME, key, contentType);
  };

  parseFiles(keys: string[]): Promise<void[]> {
    const streamsArray = keys.map(async (key) => {
      const stream = await this.storageService.getObject(this.BUCKET_NAME, key);
      return this.parseCSVFile(stream.createReadStream());
    })

    return Promise.all(streamsArray);
  }

  private parseCSVFile(stream: Readable): Promise<void> {
    console.log('parseCSVFile invoked');
    return new Promise((res, rej) => {
      stream
        .pipe(csvParser())
        .on('data', async (data) => {
          await this.sqs.sendMessage({
              QueueUrl: this.QUEUE_URL,
              MessageBody: JSON.stringify(data)
            }, () => console.log('Items added to queue' + JSON.stringify(data))).promise();
        })
        .on('error', rej)
        .on('end', res)
    })

  }
}
