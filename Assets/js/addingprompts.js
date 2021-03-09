// dependencies
const inquirer = require('inquirer');

// inquirer prompts - main menu for adding new entries
const addMenu= () => {
    inquirer
        .prompt({
            name: 'addmain',
            type: 'list',
            message: 'Welcome! Would you like to add a [department], a [role], or an [employee]?',
            choices: ['department', 'role', 'employee', 'EXIT'],
        })
        .then((response) => {
            if (response.addmain === 'department') {
                addDept();
            } else if (response.addmain === 'role') {
                addRole();
            } else if (response.addmain === 'employee') {
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

module.exports = {
    addMenu: addMenu(),
    addDept: addDept(),
    addRole: addRole(),
    addEmp: addEmp()
}