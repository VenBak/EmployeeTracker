DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL REFERENCES employees(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);


INSERT INTO department (name)
VALUES ("Human Resources"),
("Marketing"),
("Finance"),
("Operations"),
("Board of Executives");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Executive Officer", 12980, 5),
("Employee Manager", 10870, 1),
("Finance Executive Manger", 11087, 3),
("Manager", 9080, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Lazar", 1, 1),
("Lucy", "McCarthy", 2, 2),
("London", "Bertrud", 3, 3);
