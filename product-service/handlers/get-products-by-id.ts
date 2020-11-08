import { APIGatewayProxyHandler } from 'aws-lambda';

import { ProductsService } from '../services/products-service';


export const getProductsById: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    const { productId } = _event.pathParameters;

    const productById = await ProductsService.getProductById(productId);

    return {
      statusCode: 200,
      body: productById
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: e })
    }
  }
}
