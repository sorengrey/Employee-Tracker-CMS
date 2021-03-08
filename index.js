// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

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