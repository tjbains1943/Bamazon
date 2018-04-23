# Bamazon

Images of the final product were taken and placed into the images folder

In this project, node.js was used to interact with a database. The npm packages used were mysql, inquirer, and cli-table. For the database, MySQL was used to store all tables. 

1. In bamazonCustomer.js, a connection was made to the database on MySQL using node and npm mysql. From there, several queries were made. The first one was to select all columns from one table, and the other two were to update the table. This was then logged to the console using a pretty table where all the table entries were pushed.

2.  In bamazonManager.js, inquirer was used to get info from the "Manager". This input then was used to run specific MySQL queries. The first was a select all, the next one was a select where a certain amount of product was less than 5. The last query into the MySQL database was an insert into. In this instance, SQL injection was used. 

3. In bamazonSupervisor.js, a prompt was used to get info from the "Supervisor". This info was then used for control flow. For the queries in this section, two new tables were made using query results. Once these new tables were made, a select query was used to display the info into a pretty table. To create a new department, an INSERT INTO query was used along with SQL injection. 

The schema contains all the tables made which all use the same database. CRUD was used. The tables were created using create table after "USE" database was used. If the database exists already, there is a command to drop it also. An "INNER JOIN"  was also used along with aliases using "AS".