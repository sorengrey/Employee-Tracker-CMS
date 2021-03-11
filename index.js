// TO DO
// write the viewing menu function/prompts
// write the updating function/prompts
// figure out how to put queries in js functions

// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// import connection
connect = require('./Assets/connection.js');

// starts the main menu prompts
function start() {
  inquirer
  .prompt([{
      type: "list",
      message: "Welcome! Please select from the following options:",
      name: "options",
      choices: ["Add departments, roles, or employees", "View departments, roles, or employees", "Update employee roles", "EXIT"],
  }]).then(response =>{
      if (response.options === 'Add departments, roles, or employees') {
          addMenu();
      } else if (response.options === 'View departments, roles, or employees') {
          viewMenu();
      } else if (response.options === 'Update employee roles') {
          updateEmp();
      } else { console.log('Test');
      }
  });
};

// menu prompts for adding a dept, role, or employee
function addMenu() {
  return inquirer
  .prompt([{
      type: 'list',
      message: 'Would you like to add a department, a role, or an employee?',
      name: 'addmain',
      choices: ['department', 'role', 'employee', 'EXIT'],
  }])
      .then(response => {
          if (response.addmain === 'department'){
              addDept();
          } else if (response.addmain === 'role'){
              addRole();
          } else if (response.addmain === 'employee'){
              addEmp();
          }
          else { connection.end();
          }
      });
};

// prompts for adding a department
function addDept() {
  return inquirer
          .prompt([{
          name: 'deptid',
          type: 'input',
          message: 'What is the department\'s ID number?',
      },
      {
          name: 'deptname',
          type: 'input',
          message: 'What is the department\'s name?',
      }])
      .then((response => {
          let newDept;
          // input needs to be added to the db
      }));
};

// prompts for adding a role
function addRole() {
  return inquirer
      .prompt([{
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
  }])
      .then((response) => {
          let newRole;
          // input needs to be added to the db
      });
}

// prompts for adding an employee
function addEmp(){
  return inquirer
      .prompt([{
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
      }]).then((response) => {
          let newEmployee;
          // input needs to be added to the db
      });
}

function init() {
 // selectAll();
  start();
}

init();