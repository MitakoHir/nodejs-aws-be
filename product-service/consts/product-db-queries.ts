export const selectAllProducts = 'select * from products inner join stocks on products.id = stocks.product_id';
export const selectProductWithSpecifiedId = (id) => `select * from products where id=${id}`
