import { APIGatewayProxyHandler } from 'aws-lambda';
import { ProductsService } from '../services/products-service';

export const setProduct: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    const product = JSON.parse(_event.body);

    const newProductAdded = await ProductsService.setProduct(product);

    return {
      statusCode: 200,
      body: JSON.stringify(newProductAdded)
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e })
    }
  }
}
