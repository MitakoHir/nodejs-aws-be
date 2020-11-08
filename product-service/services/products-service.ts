import { DBService } from './db-service';
import { selectAllProducts, selectProductWithSpecifiedId } from '../consts/product-db-queries';

export class ProductsService {
  static async getProductsList(): Promise<any[]> {
    const body = await DBService.executeDBQuery(selectAllProducts);
    return body.rows;
  }

  static async getProductById(id: string): Promise<any[]> {
    const body = await DBService.executeDBQuery(selectProductWithSpecifiedId(id));
    return body.rows;
  }
}
