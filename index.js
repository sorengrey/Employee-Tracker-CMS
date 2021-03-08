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

    // Change this database name when you get your db ready!
    database: 'greatBay_DB',
});

// inquirer prompts main menu
const start = () => {
    inquirer
        .prompt({
            name: 'which',
            type: 'list',
            message: 'Welcome! Would you like to add a [DEPARTMENT], a [ROLE], or an [EMPLOYEE]?',
            choices: ['DEPARTMENT', 'ROLE', 'EMPLOYEE', 'EXIT'],
        })
        .then((response) => {
            // based on their answer, either call the bid or the post functions
            if (response.which === 'DEPARTMENT') {
                addDept();
            } else if (response.which === 'ROLE') {
                addRole();
            } else if (response.which === 'EMPLOYEE') {
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