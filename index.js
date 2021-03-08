// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
            choices: ['Add departments, roles, or employees', 'View departments, roles, or employees', 'Update employee roles', 'EXIT'],
        })
        .then((response) => {
            if (response.which === 'Add departments, roles, or employees') {
                addMenu();
            } else if (response.which === 'View departments, roles, or employees') {
                viewMenu();
            } else if (response.which === 'Update employee roles') {
                updateEmp();
            }
            else {
                connection.end();
            }
        });
};

// inquirer prompts - main menu for adding new entries
const addMenu= () => {
    inquirer
        .prompt({
            name: 'which',
            type: 'list',
            message: 'Welcome! Would you like to add a [department], a [role], or an [employee]?',
            choices: ['department', 'role', 'employee', 'EXIT'],
        })
        .then((response) => {
            if (response.which === 'department') {
                addDept();
            } else if (response.which === 'role') {
                addRole();
            } else if (response.which === 'employee') {
                addEmp();
            }
            else {
                connection.end();
            }
        });
};

// prompts for adding a department
const addDept = () => {
    inquirer
        .prompt({
            name: 'deptid',
            type: 'input',
            message: 'What is the department\'s ID number?',
        },
        {
            name: 'deptname',
            type: 'input',
            message: 'What is the department\'s name?',
        }
        )
        .then((response) => {
            // input needs to be added to the db
        });
};

// prompts for adding a role
const addRole = () => {
    inquirer
        .prompt({
            name: 'roleid',
            type: 'input',
            message: 'What is the role\'s ID number?',
        },
        {
            name: 'rolename',
            type: 'input',
            message: 'What is the role\'s name?',
        },
        {
            name: 'rolesal',
            type: 'input',
            message: 'What is the role\'s yearly salary?',
        },
        {   name: 'roledept',
            type: 'input',
            message: 'What is the department of the role\'s ID number?',
    })
        .then((response) => {
            // input needs to be added to the db
        });
}

// prompts for adding an employee
const addEmp = () => {
    inquirer
        .prompt({
            name: 'empid',
            type: 'input',
            message: 'What is the employee\'s ID number?',
        },
        {
            name: 'firstname',
            type: 'input',
            message: 'What is the employee\'s first name?',
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is the employee\'s last name?',
        },
        {   name: 'erid',
            type: 'input',
            message: 'What is the department of the employee\'s ID number?',
        },
        {
            name: 'manaid',
            type: 'input',
            message: 'What is the employee\'s manager\'s ID number?',
        }).then((response) => {
            // input needs to be added to the db
        });
}

// connects to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // runs the start function after the connection is made to prompt the user
  start();
});
