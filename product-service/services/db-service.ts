import { Client } from 'pg';
import { dbOptions } from '../consts/db-options';

export class DBService {
  static async executeDBQuery(query: string, values?) {
    const client = new Client(dbOptions);
    await client.connect();
    try {
      return await client.query(query, values);
    } catch (e) {
      console.error(`Error during database request executing:`, e);
    } finally {
      client.end();
    }
  }
}
