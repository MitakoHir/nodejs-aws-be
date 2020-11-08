import productList from '../mock-data/productList.json';

export class ProductsService {
  static async getProductsList(): Promise<string> {
    return new Promise((res) => {
      res(JSON.stringify(productList));
    })
  }

  static async getProductById(id: string): Promise<string> {
    return new Promise((res, rej) => {
      const product = productList.find(product => product.id === id);
      product ? res(JSON.stringify(product)) : rej('Product not found');
    })
  }
}
