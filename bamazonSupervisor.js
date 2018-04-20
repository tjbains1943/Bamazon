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

function newDepart(){

	//creates the questions to be prompted to the user when option 2 is selected - since the department id# auto increments the user doesn't have to enter anything for item id and since total sales is calculated based on sales made  the user doesn't input any data for total sales
	var newDepartment = {
		properties: {
			newDeptName:{ description: colors.magenta('Please enter the name of the new department you would like to add.')
			},
			newOverhead:{ description: colors.magenta('What are the overhead costs for this department?')
			},
		}
	}

	prompt.start();
	//gets the information the user entered for the prompt above
	prompt.get(newDepartment, function(err, res){

		//creates a variable to store the user responses
		var newDeptInfo = {
			deptName: res.newDeptName,
			overHeadNew: res.newOverhead,
			autoTotalSales: 0,
		};
		//pushes user responses to the array defined above by the variable newDept
		newDept.push(newDeptInfo);
		//connects to the mysql database Departments and inserts the information received from the user into the database to create a new department
		connection.query('INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (?, ?, ?);', [newDept[0].deptName, newDept[0].overHeadNew, newDept[0].autoTotalSales], function(err, result){
			if(err){
				console.log('Error: ' + err);
				connection.end();
			} else {
				console.log('');
				console.log('New Department sucessfully created!');
				console.log(' ');
				connection.end();
			}
		})
	})
};