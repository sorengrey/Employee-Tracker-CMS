// dependencies
const mysql = require('mysql');
const cTable = require('console.table');
// sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

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


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;

// connects to the mysql server and sql database
connection.connect((err) => {
    if (err) console.log(err)
  });

  module.exports = connection;