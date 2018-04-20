var mysql      = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bamazon'
  });
inquirer.prompt([
    {
        type: "list",
        message: "Greetings Supervisor, what would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"],
        name: "action"
    }
]).then(function(data) {
    console.log(data.action);
    switch (data.action) {
        case "View Product Sales by Department":
            viewSales();
            break;
        case "Create New Department":
        newDepart();
            break;
        default:
            break;
    }
})

function viewSales(){
	//creates a table for the data to be stored and displayed in node
	var table = new Table({
		head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit'],
		style: {
			head:['yellow'],
			compact: false,
			colAligns: ['center'],
		}
	});
	console.log(' ');
	console.log('Product Sales by Department');

	//connects to the mysql databased and grabs the information from the alias table called totalprofits.  this table contains all information from the Department database but also has an extra column that calculates how much the total profits are based on the overhead cost and the total sales made for each department
	connection.query('SELECT * FROM departments', function(err, res){
		if(err) console.log('Error: ' + err);

		//this loops through the data pulled from the totalprofits database and pushes it into the table above
		for(var i = 0; i < res.length; i++){
			table.push(
				[res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales]
				);
		}

		console.log(' ');
		console.log(table.toString());
		connection.end();
	})
};

function newDepart() {
    console.log("f");
}