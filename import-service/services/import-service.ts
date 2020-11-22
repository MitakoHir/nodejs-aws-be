import { StorageService } from './storage-service';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';

export class ImportService {
  private BUCKET_NAME = process.env.PRODUCT_BUCKET_NAME;
  private UPLOADED_FOLDER_PREFIX = 'uploaded/';
  private storageService: StorageService;

  constructor() {
    this.storageService = new StorageService();
  }

  getSignedUrlPromise(fileName: string): Promise<string> {
    const key = `${this.UPLOADED_FOLDER_PREFIX}${fileName}`;
    const contentType = 'text/csv';

    return this.storageService.getSignedUrlPromise(this.BUCKET_NAME, key, contentType);
  };

  parseFiles(keys: string[]): Promise<void[]> {
    const streamsArray = keys.map(async (key) => {
      const stream = this.storageService.getObject(this.BUCKET_NAME, key).createReadStream();
      return this.parseCSVFile(stream);
    })

    return Promise.all(streamsArray);
  }

  private parseCSVFile(stream: Readable): Promise<void> {
    return new Promise((res, rej) => {
      stream
        .pipe(csvParser())
        .on('data', console.log)
        .on('error', rej)
        .on('end', res)
    })

  }
}
