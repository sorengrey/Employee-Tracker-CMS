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

  // Change this database name!
  database: 'greatBay_DB',
});

// inquirer prompts that
const start = () => {
    inquirer
      .prompt({
        name: 'postOrBid',
        type: 'list',
        message: 'Would you like to [POST] an auction or [BID] on an auction?',
        choices: ['POST', 'BID', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === 'POST') {
          postAuction();
        } else if (answer.postOrBid === 'BID') {
          bidAuction();
        } else {
          connection.end();
        }
      });
  };