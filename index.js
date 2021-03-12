// TO DO

// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// import connection
const connection = require('./Assets/connection.js');

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
      } else { connection.end();
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
      .then(response => {
        connection.query("INSERT INTO department SET ? ", 
         {
         id: response.deptid,
         name: response.deptname
         }, (err, res) => {
         if (err) throw err;
         console.log("New department added!");
         start();
    });    
  });
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
          message: 'What is the role\'s title?',
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
        connection.query("INSERT INTO role SET ? ", 
        {
        id: response.roleid,
        title: response.rolename,
        salary: response.rolesal,
        department_id: response.roledept
        }, (err, res) => {
        if (err) throw err;
        console.log("New role added!");
        start();
   });    
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
        connection.query("INSERT INTO employee SET ? ", 
        {
        id: response.empid,
        first_name: response.firstname,
        last_name: response.lastname,
        role_id: response.erid,
        manager_id: response.manaid
        }, (err, res) => {
        if (err) throw err;
        console.log("New employee added!");
        start();
        });    
    });
    
}


// menu prompts for viewing depts, roles, and employees
const viewMenu = () => {

}

// prompts to update an employee
const updateEmp = () => {
    return inquirer
          .prompt([{
          name: 'idsearch',
          type: 'input',
          message: 'What is the employee\'s id number?',
        },
        {
          name: 'newname',
          type: 'confirm',
          message: 'Has the employee\'s name changed?',
        },
        {
          name: 'newrole',
          type: 'confirm',
          message: 'Has the employee\'s role changed?',
       },
       {
          name: 'newmgr',
          type: 'confirm',
          message: 'Has the employee\'s manager changed?',
        }])
        .then((response => {
            let newDept;
            // input needs to be added to the db
        }));
  };

// function to add a new role
function addNewRole(){
}

// function to add a new employee
function addNewEmployee(){
}

function init() {
 // selectAll();
  start();
}

init();