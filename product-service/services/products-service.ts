import { DBService } from './db-service';
import { insertProduct, selectAllProducts, selectProductWithSpecifiedId } from '../consts/product-db-queries';
import { insertStock } from '../consts/stock-db-queries';

export type Product = {
  title: string;
  price: number;
  description: string;
  count: number;
}

export class ProductsService {
  static async getProductsList(): Promise<any[]> {
    const body = await DBService.executeDBQuery(selectAllProducts);
    return body.rows;
  }

  static async getProductById(id: string): Promise<any[]> {
    const body = await DBService.executeDBQuery(selectProductWithSpecifiedId, [id]);
    return body.rows;
  }

  static async setProduct(product: Product) {
    const { title, price, description, count } = product;
    const result = await DBService.executeDBQuery(insertProduct, [title, price, description]);
    const productId = result.rows[0].id;
    if(result && productId) {
      const stock = await DBService.executeDBQuery(insertStock, [productId, count]);
      return stock.rows;
    } else {
      throw Error('Error during saving product');
    }
  }
}
