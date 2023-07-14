CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    sale_date DATE NOT NULL,
    quantity INTEGER NOT NULL
);

DO
$do$
BEGIN
   FOR i IN 1..1000000 LOOP
      INSERT INTO products (name, description, price) 
      VALUES (
          'Product ' || i, 
          'This is a description for product ' || i, 
          ROUND((RANDOM() * (100-1) + 1)::numeric, 2)
      );
   END LOOP;
END
$do$;

DO
$do$
BEGIN
   FOR i IN 1..10000000 LOOP
      INSERT INTO sales (product_id, sale_date, quantity) 
      VALUES (
          (RANDOM() * (1000000-1) + 1)::integer, 
          CURRENT_DATE - (RANDOM() * (365-1) + 1)::integer, 
          (RANDOM() * (100-1) + 1)::integer
      );
   END LOOP;
END
$do$;