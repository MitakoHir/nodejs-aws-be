import { S3Event } from 'aws-lambda';
import { ImportService } from '../services/import-service';

export async function importFileParser(event: S3Event) {
  const { Records: records } = event;

  try {
    const importService = new ImportService();
    const objectKeys = records.map(record => record.s3.object.key);
    await importService.parseFiles(objectKeys);
  } catch (e) {
    console.log('There is an error in importFileParser', e)
  }
}
