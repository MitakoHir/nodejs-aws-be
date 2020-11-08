--create table products (
--  id uuid primary key default uuid_generate_v4(),
--  title text not null,
--  description text,
--  price integer
--)

--create table stocks (
--  product_id uuid,
--  foreign key ("product_id") references "products" ("id"),
--  count integer
--)

--insert into products (title, description, price) values
--('Chess', 'Board game Chess', 3),
--('Stratego', 'Board game Stratego', 10),
--('Monopoly', 'Board game Monopoly', 23),
--('Risk', 'Board game Risk', 15),
--('The Settlers of Catan', 'Board game The Settlers of Catan', 23),
--('Scrabble', 'Board game Scrabble', 15)

--insert into stocks (product_id, count) values
--('fa51bcb3-1b11-41e9-85ab-2f220b9e43eb', 5),
--('e3ac255d-5107-43a6-8bdb-a63aabc1a11e', 12),
--('743923ae-93a2-45ac-834d-4f1821c4edab', 2),
--('4a3e05f5-a7fd-4d5c-9512-b4f12ff02cf7', 4),
--('6d00ed99-94bb-489f-b693-6f88f63730f6', 8),
--('ee4c3e3a-9126-4ff6-bb61-31fc9764fce6', 3)

--create extension if not exists "uuid-ossp";
