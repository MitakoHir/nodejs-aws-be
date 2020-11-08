import { APIGatewayProxyHandler } from 'aws-lambda';

import { ProductsService } from '../services/products-service';

export const getProductsList: APIGatewayProxyHandler = async (_event, _context) => {
  const headers = {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  const data = await ProductsService.getProductsList();

  try {
    return {
      statusCode: 200,
      headers,
      body: data
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: `There is an unexpected error ${ JSON.stringify(e) }`
    }
  }
}
