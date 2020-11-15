import { Client } from 'pg';
import { dbOptions } from '../consts/db-options';

export async function invoke() {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    await client.query(`
      create table if not exists products (
        id serial primary key,
        title text not null,
        description text,
        price integer
      )`
    );
    await client.query(`
      create table stocks (
        product_id serial,
        foreign key ("product_id") references "products" ("id"),
        count integer)`
    );
    await client.query(`
      insert into products (title, description, price) values
        ('Chess', 'Board game Chess', 3),
        ('Stratego', 'Board game Stratego', 10),
        ('Monopoly', 'Board game Monopoly', 23),
        ('Risk', 'Board game Risk', 15),
        ('The Settlers of Catan', 'Board game The Settlers of Catan', 23),
        ('Scrabble', 'Board game Scrabble', 15)`
    );
    await client.query(`
      insert into stocks (product_id, count) values
        (1, 5),
        (2, 12),
        (3, 2),
        (4, 4),
        (5, 8),
        (6, 3)`
    );

    const { rows: products } = await client.query(`select * from products`);
    console.log(products);

  } catch (e) {
    console.error(`Error during database request executing:`, e);
  } finally {
    client.end();
  }
}
