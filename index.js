// TO DO
// write the viewing menu function/prompts
// write the updating function/prompts

// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// imported functions
const adding = require('./Assets/js/addingprompts.js');
const viewing = require('./Assets/js/viewingprompts.js');
const updating = require('./Assets/js/updatingprompts.js');

// connecting the database
const connection = mysql.createConnection({
    host: 'localhost',

    // setting a port
    port: process.env.PORT || 3306,

    // username
    user: 'root',

    // password
    password: 'toby0000',

    // database
    database: 'employeetracker',
});

// starts the inquirer prompts
const start = () => {
    inquirer
        .prompt({
            name: 'which',
            type: 'list',
            message: 'Welcome! What would you like to do?',
            choices: ['[Add] departments, roles, or employees', '[View] departments, roles, or employees', '[Update] employee roles', 'EXIT'],
        })
        .then((response) => {
            if (response.choices === '[Add] departments, roles, or employees') {
                addMenu();
            } else if (response.choices === '[View] departments, roles, or employees'){
                viewMenu();
            } else if (response.choices === '[Update] employee roles'){
                updateEmp();
            }
            else {
                connection.end();
            }
        });
};

// connects to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // runs the start function after the connection is made to prompt the user
  start();
});
