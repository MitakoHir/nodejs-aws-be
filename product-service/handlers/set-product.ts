import { APIGatewayProxyHandler } from 'aws-lambda';
import { ProductsService } from '../services/products-service';

export const setProduct: APIGatewayProxyHandler = async (_event, _context) => {
  const headers = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
  };

  try {
    const product = JSON.parse(_event.body);

    const newProductAdded = await ProductsService.setProduct(product);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(newProductAdded)
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: e })
    }
  }
}
