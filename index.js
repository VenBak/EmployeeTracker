const inquirer = require("inquirer")
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');

// Create the connection to the database using mysql2
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

// Connect to the database
db.connect(
  start()
)

// Variables that hold the sql code for each of the actions im gonna use them for
var allRoles = `SELECT role.id as "Role ID", department.name as "Department", role.salary as "Salary", role.title as "Title"
                FROM company_db.role JOIN company_db.department ON company_db.department.id = role.department_id`

var allDepartments = `SELECT id as "Department ID", name as "Department" FROM company_db.department`

var allEmployees =  `SELECT employee.id as "Employee ID",
                      employee.first_name as "First Name",
                      employee.last_name as "Last Name",
                      role.title as Title,
                      department.name as Department,
                      role.salary as Salary,
                      concat(manager.first_name, " ", manager.last_name) as "Manager Name" FROM company_db.employee employee
                      LEFT JOIN company_db.employee manager ON employee.manager_id = manager.id
                      LEFT JOIN company_db.role ON company_db.role.id = employee.role_id
                      LEFT JOIN company_db.department ON company_db.department.id = role.department_id`

// The start function will load the main menu, asking the user what they want to be done
function start() {
inquirer.prompt([ 
    {
    type: 'list',
    name: 'action',
    message: 'What type of team member would you like to add ?',
    choices:['View All Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
}
])
// Based on the answer the user has given, we will launch individual functions that do what is wanted
  .then(answers => {
  console.info(answers)
  switch (answers.role) {
    case 'View All Employees':
        viewTable(allEmployees)
        break;
    case 'Update Employee Role':
        updateEmployeeRole()
        break;
    case 'View All Roles':
        viewTable(allRoles)
        break;
    case 'Add Role':
        addRole();
        break;
    case 'View All Departments':
        viewTable(allDepartments)
        break;
    case 'Add Department':
        addDepartment()
        break;
  }
})
}

// function that adds queries and launches the main menu function start() again
function addQuery (sql, parameters) {
  db.query(sql, param)
  
  start()
}

// The function that updates the employee role
function updateEmployeeRole() {
  let updateEmployeeRoleSql = `SELECT CONCAT(first_name, ' ', last_name) as manager_full_name FROM company_db.employee 
                                JOIN company_db.role ON company_db.employee.role_id = company_db.role.id WHERE role.title = "Manager";`
  db.query(updateEmployeeRoleSql)
  // It then asks a series of questions to update the employee role
  inquirer.prompt([
    {
        type: "input",
        message: "What is the employee's first name ?",
        name: "first_name",
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
    },
    {
        type: "list",
        message: "What is the employee's role?",
        choices: ['ex: CEO', 'CFO', 'Janitor'],
        name: "role"
    }
])}

// Functions that will be used to see the selected table
function viewTable (query) {
  // run a query based on the parameters passed in the function
  db.query(query, (error, data) => {
    error ? console.info(error) : 
    console.log(cTable.getTable(data)) 
    start()
  })
}

// function addRole() {

// }

// Function that will be used to add a department
function addDepartment() {
  // Runs a prompt to see what kind of department the user would like to add
  inquirer.prompt([
      {
          type: "input",
          message: "What is the name of the department you wish to add ??",
          name: "name"
      },
  ]).then((data) => {
      const sql = `INSERT INTO company_db.department (name) VALUES (?)`;
      const param = [data.name];
      addQuery(sql, param);
  });
}


