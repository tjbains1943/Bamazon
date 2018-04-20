var mysql      = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table');
var action;
var newAmnt;
var itemId;
var newQuant;
var prodName;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});
 connection.connect();
 
inquirer.prompt([
    {
        type: "list",
        name: "action",
        message: "Greetings Manager, what would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory","Add to Inventory","Add New Product"]
    }
]).then(function(data) {
    console.log(data.action);
    action = data.action;

    switch (action) {
        case "View Products for Sale":
        view();
            break;
        case "View Low Inventory":
        lowCount();
            break;
        case "Add to Inventory":
        addInv();
            break;
        case "Add New Product":
        newProd();
            break;
        default:
            break;
    }
})

function view() {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        var table = new Table({
			head: ['Item Id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['yellow'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//this loops through the mysql connection and for each item that is returned, the information is then pushed to the table
		for(var i=0; i < results.length; i++) {
			table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
            );
		}

		//this console.logs the table and then ends the mysql query connection
		console.log(table.toString());
        connection.end();
})
}


function lowCount() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, results) {
        if (error) throw error;
        console.log(results);
    })
    connection.end();
}

function addInv() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the item-id of the product that is being added?",
                name: "itemId"
            },
            {
                type: "input",
                message: "How many units are being added?",
                name: "quantity"
            }
        ]).then(function(data) {
            itemId = data.itemId;
            addAmnt = data.quantity;
            connection.query('UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?', [addAmnt, itemId], function (error, results, fields) {
                if (error) throw error; 
        })
        connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        newQuant = results[itemId - 1].stock_quantity;
        prodName = results[itemId - 1].product_name;
        console.log(results);
        console.log("You have successfully added more inventory. You now have " + newQuant + " units of " + prodName + ".");
    })  
        connection.end();
    })
}

function newProd() {
    inquirer.prompt([
        {
            message: "What is the name of the new product?",
            name: "productName"
        },
        {
            message: "What is the department name of the product?",
            name: "departmentName"
        },
        {
            message: "What is the price of the product?",
            name: "price"
        },
        {
            message: "What is the current stock quantity?",
            name: "stockQuantity"
        }
    ]).then(function(data) {
        console.log(data);
        var productName = data.productName;
        var departmentName = data.departmentName;
        var price = data.price;
        var stockQuantity = data.stockQuantity;
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) Values (?,?,?,?)", 
        [productName, departmentName, price, stockQuantity], function(error, results) {
            if (error) throw error;
            console.log(results);
        })
        connection.end();
    })
}