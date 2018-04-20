DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id integer(10) primary key not null auto_increment,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price integer(10) not null,
    stock_quantity integer(10),
    product_sales integer(10)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("xbox", "electronics", 50, 74),("xbox360", "electronics", 100, 79),("xbox One", "electronics", 150, 234),("Nintendo Wii", "electronics", 175, 249),("PlayStation", "electronics", 50, 43),("Nintendo 64", "electronics", 50, 3),("PlayStation 2", "electronics", 110, 89),("PlayStation 3", "electronics", 200, 3428),("PlayStation 4", "electronics", 300, 984),("PlayStation 5", "electronics", 430, 3);

SELECT * FROM products;

USE bamazon;

CREATE TABLE departments (
    department_id integer(10) primary key not null auto_increment,
    department_name varchar(30) not null,
    over_head_costs integer(10) not null,
    product_sales integer(10)
);

INSERT INTO departments (department_id, department_name, over_head_costs, product_sales)
VALUES (1, "electronics", 3000, 23000);