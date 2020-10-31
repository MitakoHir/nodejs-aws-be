import { APIGatewayProxyHandler } from 'aws-lambda';

import productList from '../mock-data/productList.json';

export const getProductsList: APIGatewayProxyHandler = async (_event, _context) => {
  const headers = {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  try {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(productList)
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: `There is an unexpected error ${ JSON.stringify(e) }`
    }
  }
}
