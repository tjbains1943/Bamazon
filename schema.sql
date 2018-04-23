DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id integer(10) primary key not null auto_increment,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price integer(10) not null,
    stock_quantity integer(10),
    product_sales integer(10) not null default 0
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("shirt", "clothing", 32, 534), ("xbox", "electronics", 50, 74),("xbox360", "electronics", 100, 79),("xbox One", "electronics", 150, 234),("Nintendo Wii", "electronics", 175, 249),("PlayStation", "electronics", 50, 43),("Nintendo 64", "electronics", 50, 3),("PlayStation 2", "electronics", 110, 89),("PlayStation 3", "electronics", 200, 3428),("PlayStation 4", "electronics", 300, 984),("PlayStation 5", "electronics", 430, 3);

INSERT INTO products(product_name,department_name,price,stock_quantity, product_sales)
Values  ("shirty", "clothing", 32, 534, 2342),("shirty", "clothing", 32, 534, 2342);
-- SELECT * FROM products;

USE bamazon;

CREATE TABLE departments (
    department_id integer(10) primary key not null auto_increment,
    department_name varchar(30) not null,
    over_head_costs integer(10) not null
);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (1, "electronics", 3000), (2, "clothing", 232);

CREATE table myquery AS
select products.department_name, Sum(products.product_sales) as Department_Sales
FROM products
group by products.department_name;

drop table if exists final;
CREATE table final as
SELECT departments.department_id, departments.department_name, departments.over_head_costs, myquery.Department_Sales, (myquery.Department_Sales - departments.over_head_costs) as Profit
FROM departments
inner join myquery
on departments.department_name = myquery.department_name;

select * from final;

