// dependencies
const mysql = require('mysql');
const cTable = require('console.table');

// import - might not need this
//  const index = require('index.js');

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

// // selects all the info in the database 
// function selectAll () {
//     connection.query("SELECT * FROM employeetracker", (err, data) => {
//     if (err) throw err;
//     console.log(data)
//     })
//   }

// connects to the mysql server and sql database
connection.connect((err) => {
    if (err) console.log(err)
  });

//   module.exports = {
//       selectAll: selectAll()
//   }