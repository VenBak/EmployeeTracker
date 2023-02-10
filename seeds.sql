USE employee_db;

INSERT INTO department (id, name)
VALUES (001, "Human Resources"),
(002, "Marketing"),
(003, "Finance"),
(004, "Operations"),
(005, "Board of Executives");

SELECT * FROM employee_db.department;

----

USE employee_db;

SELECT * FROM employee_db.roles;

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Chief Executive Officer", 12.98, 005),
(002, "Employee Manager", 10.87, 001),
(003, "Finance Executive Manger", 11.87, 003);

SELECT * FROM employee_db.roles;

----

USE employee_db;

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (001, "Bob", "Lazar", 001),
(002, "Lucy", "McCarthy", 002),
(003, "London", "Bertrud", 003);

SELECT * FROM employee_db.employee;

----

USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Boris", "Johnson", 2, 4),
       ("David","Smith", 1, 3),
       ("Dan", "Grud", 3, 4);

SELECT * FROM employee_db.employee;