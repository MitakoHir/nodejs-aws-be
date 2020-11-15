export const selectAllProducts = 'select * from products inner join stocks on products.id = stocks.product_id';
export const selectProductWithSpecifiedId = 'select * from products where id=$1';
export const insertProduct = 'insert into products (id, title, price, description) values (default, $1, $2, $3) returning id';
