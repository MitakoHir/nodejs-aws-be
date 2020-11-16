import { S3 } from 'aws-sdk';
import { Request } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';

export class StorageService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({ region: 'eu-west-1' });
  }

  getSignedUrlPromise(bucket: string, key: string, contentType: string): Promise<string> {
    const params = {
      Bucket: bucket,
      Key: key,
      Expires: 120,
      ContentType: contentType
    }

    return this.s3.getSignedUrlPromise('putObject', params)
  }

  getObject(bucket: string, key: string): Request<S3.Types.GetObjectOutput, AWSError>  {
    return this.s3.getObject({
      Bucket: bucket,
      Key: key
    });
  }
}
