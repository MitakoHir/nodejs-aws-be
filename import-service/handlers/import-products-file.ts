import { APIGatewayProxyHandler } from 'aws-lambda';
import { ImportService } from '../services/import-service';

export const importProductsFile: APIGatewayProxyHandler = async (_event, _context) => {
  const headers = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
  };

  try {
    const { name: fileName } = _event.queryStringParameters;

    const importService = new ImportService();

    const signedUrl = await importService.getSignedUrlPromise(fileName);

    return {
      statusCode: 200,
      headers,
      body: signedUrl
    }
  } catch (e) {
    console.log('There is an error in importProductsFile', e);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: e })
    }
  }
};
