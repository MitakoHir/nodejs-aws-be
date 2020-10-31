import { APIGatewayProxyHandler } from 'aws-lambda';

import productList from '../mock-data/productList.json';


export const getProductsById: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    const { productId } = _event.pathParameters;

    const productById = productList.find(product => product.id === productId);

    const successResponse = {
      statusCode: 200,
      body: JSON.stringify(productById)
    };

    const notFoundResponse = {
      statusCode: 404,
      body: JSON.stringify({ error: "Product not found" })
    };

    return productById ? successResponse : notFoundResponse;
  } catch (e) {
    return {
      statusCode: 500,
      body: `There is an unexpected error ${ JSON.stringify(e) }`
    }
  }
}
