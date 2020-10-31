import { APIGatewayProxyHandler } from 'aws-lambda';

import productList from '../mock-data/productList.json';

export const getProductsList: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(productList)
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: `There is an unexpected error ${ JSON.stringify(e) }`
    }
  }
}
