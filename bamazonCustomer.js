var mysql      = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});
 var newAmnt;
 var itemId;
var totalPrice = 0;
 connection.connect();
 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  var table = new Table({
    head: ['Item Id', 'Product Name', 'Price', 'Product Sales'],
    style: {
      head: ['yellow'],
      compact: false,
      colAligns: ['center'],
    }
	});
  for (let x = 0; x < results.length; x++) {
    table.push(
			[results[x].item_id, results[x].product_name, results[x].price, results[x].product_sales]
		);
	}
	console.log(table.toString());
  inquirer.prompt([
    {
      message: "What is the id of the product you would like to buy?",
      name: "item",
    },
    {
      message: "How many units would you like to buy?",
      name: "amount"
    }
  ]).then(function(data) {
    itemId = (data.item);
    newAmnt = results[itemId - 1].stock_quantity - data.amount;
    totalPrice = (results[itemId - 1].price) * data.amount;
    department = (results[itemId - 1].department_name);
    if(newAmnt >= 0) {
      console.log("Purchase Successful");
      connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newAmnt, itemId], function (error, results, fields) {
        if (error) throw error;
        // console.log(newAmnt);
        // console.log(itemId);
      });
      console.log("Your total is $" + totalPrice + ".");
      connection.query('UPDATE products SET product_sales = (product_sales + ?) WHERE item_id = ?', [totalPrice, itemId], function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
      })
      connection.query('drop table if exists myquery;', [totalPrice, itemId], function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
      })
      // if (results)
      connection.query('drop table if exists final;', [totalPrice, itemId], function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
      })
//       connection.query('SELECT * FROM products', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });
      connection.end();      
    }
    else {
      console.log("Sorry, we only have " + results[data.item - 1].stock_quantity + " in stock.");
    };
  })
});


