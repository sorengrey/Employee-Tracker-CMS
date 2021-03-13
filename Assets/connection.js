// dependencies
const mysql = require('mysql');
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


// connects to the mysql server and sql database
connection.connect((err) => {
    if (err) console.log(err)
  });

  module.exports = connection;