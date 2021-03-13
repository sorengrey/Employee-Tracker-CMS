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
      message: "Please select from the following options:",
      name: "options",
      choices: ["Add departments, roles, or employees", "View departments, roles, or employees", "Update employee info", "EXIT"],
  }]).then(response =>{
      if (response.options === 'Add departments, roles, or employees') {
          addMenu();
      } else if (response.options === 'View departments, roles, or employees') {
          viewMenu();
      } else if (response.options === 'Update employee info') {
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
        // adds the user's response to the role table
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
        // connects to the database and adds the user's response to the employee table
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
        // takes the user back to the main menu
        start();
        });    
    });  
}

// menu prompts for viewing depts, roles, and employees
const viewMenu = () => {
    return inquirer
    .prompt({
        name: 'whichview',
        type: 'list',
        message: 'What would you like to view?',
        choices: ['departments', 'roles', 'employees'],
    }).then(response => {
        // if the user selects departments, the department table will be displayed in the console
        if(response.whichview === 'departments'){
            // selects everything in the department table
            const query = `SELECT * FROM department`;
            // connects to the database
            connection.query(query, (err, data) => {
                let departmentArray = [];
                if (err) throw err;
                // takes the data in department table and pushes it to the empty departmentArray, matching up the column names to the data in the database
                data.forEach(({ id, name }) => {
                       let allDepartments = [id, name];
                       departmentArray.push(allDepartments);
                })
                // prints table to console with labels for each column
                console.table(['ID #', ' Name'], departmentArray)
                // takes the user back to the main menu
                start();
            })
        }

        // if the user selects roles, the role table will be displayed in the console
        else if(response.whichview === 'roles'){
            // selects everything in the role table
            const query = `SELECT * FROM role`;
            // connects to the database
            connection.query(query, (err, data) => {
                let roleArray = [];
                if (err) throw err;
                // takes the data in department table and pushes it to the empty roleArray, matching up the column names to the data in the database
                data.forEach(({ id, title, salary, department_id}) => {
                       let allRoles = [id, title, salary, department_id];
                       roleArray.push(allRoles);
                })
                // prints table to console with labels for each column
                console.table(['ID #', 'Title', 'Yearly Salary', 'Department ID #'], roleArray)
                // takes the user back to the main menu
                start();
            })
        }

        // if the user selects employees, the employee table will be displayed in the console
        else if(response.whichview === 'employees'){
            // selects everything in the employee table
            const query = `SELECT * FROM employee`;
            connection.query(query, (err, data) => {
                let employeeArray = [];
                if (err) throw err;
                // takes the data in employee table and pushes it to the empty employeeArray, matching up the column names to the data in the database
                data.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
                       let allEmployees = [id, first_name, last_name, role_id, manager_id];
                       employeeArray.push(allEmployees);
                })
                // prints table to console with labels for each column
                console.table(['ID #', 'First Name', 'Last Name', 'Role ID #', 'Manager ID #'], employeeArray)
                // takes the user back to the main menu
                start();
            })
        }
    })
}

// prompts to update an employee's records
const updateEmp = () => {
    return inquirer
          .prompt([{
          name: 'newfirst',
          type: 'confirm',
          message: 'Has the employee\'s first name changed?',
        },
        {
            name: 'newlast',
            type: 'confirm',
            message: 'Has the employee\'s last name changed?',
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
            // if the user answers yes to any of the above questions, the corresponding function is called, otherwise they will be sent back to the main menu
            if(response.newfirst === true){
                newFirst();
            } else if (response.newlast === true){
                newLast();
            } else if (response.newmgr === true){
                newManager()
            } else if (response.newrole === true){
                newRole();
            } else {
                console.log("No changes made.")
                start();
            }
        }))
    // changes the employee's first name
    function newFirst(){
        return inquirer
        .prompt([{
                name: 'idsearch',
                type: 'input',
                message: 'What is the employee\'s id number?',
              },
              {
                name: 'changedfirst',
                type: 'input',
                message: 'What is the employee\'s new first name?'
         }]).then(response => {
             // looks up the employee by their id number and saves the user's changes
            let updateQuery = `UPDATE employee
            SET
            first_name = "${response.changedfirst}"
            WHERE id = ${response.idsearch};`
            connection.query(updateQuery, (err) => {
                if (err) throw err;
                else console.log("Employee updated!")
                start();
            })
        })
     }
     // changes the employee's last name
     function newLast(){
        return inquirer
        .prompt([{
                name: 'idsearch',
                type: 'input',
                message: 'What is the employee\'s id number?',
              },
              {
                name: 'changedlast',
                type: 'input',
                message: 'What is the employee\'s new last name?'
         }]).then(response => {
             // updates the employee's last name if it has changed
            let updateQuery = `UPDATE employee
            SET
            last_name = "${response.changedlast}"
            WHERE id = ${response.idsearch};`
            connection.query(updateQuery, (err) => {
                if (err) throw err;
                else console.log("Employee updated!")
                start();
            })
        })
     }
     // changes the employee's manager
     function newManager(){
        return inquirer
        .prompt([{
                name: 'idsearch',
                type: 'input',
                message: 'What is the employee\'s id number?',
              },
              {
                name: 'changedmgr',
                type: 'input',
                message: 'What is the employee\'s new manager\'s id number?'
         }]).then(response => {
            // looks up the employee by their id number and saves the user's changes
            let updateQuery = `UPDATE employee
            SET
            manager_id = "${response.changedmgr}"
            WHERE id = ${response.idsearch};`
            connection.query(updateQuery, (err) => {
                if (err) throw err;
                else console.log("Employee updated!")
                start();
            })
        })
     }
     // updates the user's role
     function newRole(){
        return inquirer
        .prompt([{
                name: 'idsearch',
                type: 'input',
                message: 'What is the employee\'s id number?',
              },
              {
                name: 'changedrole',
                type: 'input',
                message: 'What is the employee\'s new role ID number?'
         }]).then(response => {
             // looks up the employee by their id number and saves the user's changes
            let updateQuery = `UPDATE employee
            SET
            role_id = "${response.changedrole}"
            WHERE id = ${response.idsearch};`
            connection.query(updateQuery, (err) => {
                if (err) throw err;
                else console.log("Employee updated!")
                start();
            })
        })
     }
  };

// starts the prompts
function init() {
  console.log(`

  ███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
  ██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
  █████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
  ██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
  ███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                       
                                                                       
  ████████ ██████   █████   ██████ ██   ██ ███████ ██████              
     ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██             
     ██    ██████  ███████ ██      █████   █████   ██████              
     ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██             
     ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██             
                                                                       
  created by Heather Smith - 2021 - halexsmith86@gmail.com                                                                     
-----------------------------------------------------------------------

Welcome!
`);
  start();
}

init();