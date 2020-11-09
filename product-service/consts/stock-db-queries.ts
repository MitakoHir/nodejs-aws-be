export const insertStock = (productId, count) => `insert into stocks (product_id, count) values (${productId}, ${count})`;
