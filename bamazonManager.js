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
    displayOptions();
})


function displayOptions() {
    inquirer.prompt([{
        type: 'rawlist',
        name: 'bid',
        message: 'What do you want to do?',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ]
    }, ]).then(function (answers) {
        console.log(answers);
        if (answers.bid === "View Products for Sale") {
            console.log("Viewing Products for Sale");
            viewProductsForSale();
        }

        if (answers.bid === "View Low Inventory") {
            console.log("Viewing Low Inventory");
            viewLowInventory();
        }

        if (answers.bid === "Add to Inventory") {
            console.log("Adding to Inventory");
            addToInventory();
        }

        if (answers.bid === "Add New Product") {
            console.log("Adding New Product");
            whatProductToAdd();
        }
    });
}

function viewProductsForSale() {
    console.log("test");
    connection.query("SELECT * FROM products", function (error, result) {
        if (error) throw error;
        // console.log(result);
        result.forEach(row => {
            console.log(`ID: ${row.item_id} Name: ${row.product_name}, Department: ${row.department_name}, Price: ${row.price}, Quantity: ${row.stock_quantity}`)

        })
        displayOptions();
    });

}

function viewLowInventory() {
    console.log("test");
    connection.query("SELECT * FROM products", function (error, result) {
        if (error) throw error;
        // console.log(result);
        result.forEach(row => {
            if (row.stock_quantity < 5) {
                console.log(`ID: ${row.item_id} Name: ${row.product_name}, Department: ${row.department_name}, Price: ${row.price}, Quantity: ${row.stock_quantity}`)
            }
        })
        displayOptions();
    });
}

function addToInventory() {
    inquirer.prompt([{
            type: 'rawlist',
            name: 'item_number',
            message: 'Choose an item to add to the inventory:',
            choices: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10'
            ]
        },
        {
            name: "add_to_inventory",
            message: "How many units would you like to add to the inventory?",
        },
    ]).then(function (answers) {
        // console.log(answers);
        var itemNumber = answers.item_number;
        var addToInventory = answers.add_to_inventory;
        // console.log(answers.item_number);
        // console.log(answers.add_to_inventory);
        getInventoryDetails(itemNumber, addToInventory);
    });
}

function getInventoryDetails(itemNumber, addToInventory) {
    console.log("getting inventory details");
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemNumber
    }, function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log(res[0].item_id, res[0].stock_quantity);
        var newStockQuantity = parseFloat(res[0].stock_quantity) + parseFloat(addToInventory);
        console.log(newStockQuantity);
        updateInventory(itemNumber, newStockQuantity);
    });
}

function updateInventory(itemNumber, newStockQuantity) {
    console.log("Updating...\n");
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newStockQuantity
    }, {
        item_id: itemNumber
    }], function (error, result) {
        if (error) throw error;
        console.log(result.affectedRows);
        displayOptions();
    });
}


function whatProductToAdd() {
    inquirer.prompt([{
            name: "product_name",
            message: "What is the product name that you want to add?",
        },
        {
            name: "department_name",
            message: "What department is this found in?",
        },
        {
            name: "price",
            message: "What is the price?",
        },
        {
            name: "stock_quantity",
            message: "How many are in stock?",
        }
    ]).then(function (answers) {

        console.log(answers);
        var newProductName = answers.product_name;
        var newDepartment = answers.department_name;
        var newPrice = answers.price;
        var newStockQuantity = answers.stock_quantity;
        addNewProduct(newProductName, newDepartment, newPrice, newStockQuantity);
    });
}


function addNewProduct(newProductName, newDepartment, newPrice, newStockQuantity) {
    connection.query(
        "INSERT INTO products SET ?",
        [{
            product_name : newProductName,
            department_name : newDepartment,
            price: newPrice,
            stock_quantity : newStockQuantity                 
        }],
        function (err, res) {
          if (err) { console.log(err);}
          else{
            console.log(res + " new bid item inserted!\n");
          }
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();
            displayOptions();
        });
    
}