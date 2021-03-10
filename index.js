// TO DO
// write the viewing menu function/prompts
// write the updating function/prompts
// get the db connected properly

// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// imported functions
 const adding = require('./Assets/js/addingprompts.js');
// const viewing = require('./Assets/js/viewingprompts.js');
// const updating = require('./Assets/js/updateprompts.js');

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

// selects all the info in the database and displays it in the console
function selectAll () {
    connection.query("SELECT * FROM employeetracker", (err, data) => {
    if (err) throw err;
    console.log(data)
    })
  }

// starts the inquirer prompts
function start() {
    console.log('in start')
    inquirer.prompt([{
        type: 'list',
        message: 'Welcome! Please select from the following options:',
        name: 'start',
        choices: ['Add departments, roles, or employees', 'View departments, roles, or employees', 'Update employee roles', 'EXIT']
    }]).then(response => {
        console.log('inside response')
            if (response.start === 'Add departments, roles, or employees'){
                addMenu();
            } else if (response.start === 'View departments, roles, or employees'){
                viewMenu();
            } else if (response.start === 'Update employee roles'){
                updateEmp();
            }
            else {
                console.log('Test')
                connection.end();
            }
    })
}

const doDatabaseThings = () => {
     selectAll();
     start();
}

// connects to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err
  else console.log('Running!')
});

// doDatabaseThings();