var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "<enter mysql password>",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "confirm",
        message: "Would you like to buy something today?",
      })
      .then(function(answer) {

          if(answer.action) {
            var query = "SELECT item_id, product_name, price FROM products";
            connection.query(query, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                console.log("\nitem id: " + res[i].item_id + " || product: " + res[i].product_name + " || price: " + res[i].price);
              }
            
              itemSearch()
            });
        }

        else {
            connection.end();
        }

        });
}

var questions = [
    { 
        name: "id",
        type: "input",
        message: "What's the id of the product you would like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    },{
        name: "units",
        type: "input",
        message: "How many units of the item would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }]
    

function itemSearch() {
    inquirer
        .prompt(questions)
        .then(function(answer) {
            var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, {item_id: answer.id}, function(err, res) {
                if(answer.units <= res[0].stock_quantity) {
                    console.log("Here's the total cost of the purchase:" + (res[0].price * answer.units));
                    function updateStock(answer){
                        var query = "UPDATE products SET ? WHERE item_id = " + answer.id;
                        connection.query(query, {stock_quantity: (res[0].stock_quantity - answer.units)}, function(err, res) {
                            console.log(res[0].stock_quantity);
                            
                            if(err) throw err;
                            console.log("Thank you for shopping with us!");
                            connection.end();
                        });
                    }
                    updateStock(answer);
                }

                else {
                    console.log("Sorry! We don't have sufficient quantiy!");
                    runSearch();
                }

            });
        });
}