DROP DATABASE IF EXISTS employeetracker;

CREATE DATABASE employeetracker;

USE employeetracker;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30), -- to hold department name
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30), -- to hold role title
  salary DECIMAL, -- to hold role salary
  department_id INT, -- to hold reference to department role belongs to
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30), -- to hold employee first name
  last_name VARCHAR(30), -- to hold employee last name
  role_id INT, -- to hold reference to role employee has
  manager_id INT, -- to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  PRIMARY KEY (id)
  );
  
--   INSERT INTO department (id, name)
--   VALUES (324, 'Accounting');
--   
--   SELECT * FROM department;