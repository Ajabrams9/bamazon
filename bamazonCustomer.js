var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AVG2efTG!",
    database: "bamazon"
});

connection.connect(err => {
    if (err) {
        throw err;
    }
    displayForSale();

})

function displayForSale() {
    connection.query("SELECT * FROM products", function (error, result) {
        if (error) throw error;
        // console.log(result);
        result.forEach(row => {
            console.log(`ID: ${row.item_id} Name: ${row.product_name}, Department: ${row.department_name}, Price: ${row.price}, Quantity: ${row.stock_quantity}`)

        })
        askQuestion();
    });

}

function askQuestion() {
    inquirer.prompt([{
            name: "item_id",
            message: "What is the item id?",
        },
        {
            name: "want_to_buy",
            message: "How many units would you like to buy?",
        }
    ]).then(function (answers) {
        checkQuantity(answers.item_id, answers.want_to_buy);
        // console.log(answers.stock_quantity);
    });
}


function checkQuantity(itemID, wantToBuy) {
    console.log("checking quantity");
    //select all from the products table where item id equals
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemID
    }, function (err, res) {
        if (err) throw err;
        var theStockQuantity = res[0].stock_quantity;
        if (wantToBuy <= theStockQuantity) {
            console.log("you are allowed to buy");
            updateProduct(itemID, wantToBuy, theStockQuantity);
        } else {
            console.log("Insufficient Quantity!");
            displayForSale();
        }
    });
}

function updateProduct(itemID, wantToBuy, theStockQuantity) {
    console.log("Updating...\n");
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: (theStockQuantity - wantToBuy)
    }, {
        item_id: itemID
    }], function (error, result) {
        if (error) throw error;
        console.log(result.affectedRows);
        console.log("Purchased!");
        readPrice(itemID, wantToBuy);
    });
}

function readPrice(itemID, wantToBuy) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemID
    }, function (error, result) {
        if (error) throw error;
        // console.log(result);
        var price = result[0].price;
        // var quantity = result[0].stock_quantity;
        var totalCost = price * wantToBuy;
        console.log(`You have just spent: $${totalCost}`);
        displayForSale();
    });
    // connection.end();
}