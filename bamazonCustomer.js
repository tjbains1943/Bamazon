var mysql      = require('mysql');
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});
 
connection.connect();
 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  for (let x = 0; x < results.length; x++) {
    console.log("item-id:" + results[x].item_id + " name: " + results[x].product_name + "     price: $" + results[x].price);
  }
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
    console.log(data.item);
    console.log(data.amount);
    if(results[data.item - 1].stock_quantity- data.amount >= 0) {
      console.log("Purchase Successful");
    }
    else {
      console.log("Sorry, we only have " + results[data.item - 1].stock_quantity + " in stock.");
    };
  })
});
 
connection.end();