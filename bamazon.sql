DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(255),
department_name VARCHAR(255),
price DECIMAL(10,2) NULL,
stock_quantity INTEGER NULL

);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("socks", "clothing", 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("pants", "clothing", 20.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("tv", "electronics", 100.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("nintendo", "electronics", 249.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("advil", "pharmacy", 2.25, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("bananas", "food", 1.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("spaghetti", "food", 2.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("coat", "clothing", 39.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("shampoo", "toiletries", 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("toothbrush", "toiletries", 3.25, 200);
