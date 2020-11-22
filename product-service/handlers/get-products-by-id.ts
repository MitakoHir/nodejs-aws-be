import { APIGatewayProxyHandler } from 'aws-lambda';

import { ProductsService } from '../services/products-service';


export const getProductsById: APIGatewayProxyHandler = async (_event, _context) => {
  const headers = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE"
  };

  try {
    const { productId } = _event.pathParameters;

    const productById = await ProductsService.getProductById(productId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(productById)
    };
  } catch (e) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: e })
    }
  }
}
