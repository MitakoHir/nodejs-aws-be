export const selectAllProducts = 'select * from products inner join stocks on products.id = stocks.product_id';
export const selectProductWithSpecifiedId = (id) => `select * from products where id=${id}`
export const insertProduct = (title, price, description) => `insert into products (id, title, price, description) values (default, '${title}', ${price}, '${description}') returning id`;
