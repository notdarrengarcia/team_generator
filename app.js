// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


let employeeID = 1;
let employeeList = [];

function managerPrompts() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Manager Name:",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is your e-mail address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "managerOffice"
            }
        ])
        .then(function(response){
            let managerName = response.managerName;
            let managerEmail = response.managerEmail;
            let managerOffice = response.managerOffice;
            let manager = new Manager(
                managerName,
                employeeID,
                managerEmail,
                managerOffice
            );
            employeeList.push(manager);
            
            employeeID++;

            console.log(`
            
            Let's talk about your employees now!

            `);
            employeePrompts();
        });    
}

function employeePrompts() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What is this employee's role?",
                name: "employeeType"
            },
            {
                type: "input",
                message: "What is the employee's name?",
                name: "employeeName"
            },
            {
                type: "input",
                message: "What is their e-mail address?",
                name: "employeeEmail"
            }
        ])
        .then(function(response) {
            let employeeType = response.employeeType;
            let employeeName = response.employeeName;
            let employeeEmail = response.employeeEmail;

            if (employeeType === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your employee's Github?",
                            name: "gitHubUN"
                        },
                        {
                            type: "list",
                            message: "Do you have anymore employees you would like to add on?",
                            choices: ["YES", "NO"],
                            name: "moreEmployees"
                        }
                    ])
                    .then(function(response) {
                        let employeeGitHub = response.gitHubUN;

                        let engineer = new Engineer(
                            employeeName,
                            employeeID,
                            employeeEmail,
                            employeeGitHub
                        );

                        employeeList.push(engineer);
                        employeeID++;

                        if (response.moreEmployees === "Yes") {
                            employeePrompts();
                        } else {
                            generatePage();
                            return;
                        }
                    });
            } else {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Where does the intern go to school?",
                            name: "internSchooling"
                        },
                        {
                            type: "input",
                            message: "Anymore employees you want to add?",
                            name: "moreEmployees"
                        }
                    ])
                    .then(function(response) {
                        let employeeSchool = response.employeeSchool;

                        let intern = new Intern(
                            employeeName,
                            employeeID,
                            employeeEmail,
                            employeeSchool
                        );

                        employeeList.push(intern);

                        employeeID++;

                        if (response.moreEmployees === "YES") {
                            employeePrompts();
                        } else {
                            generatePage();
                            return;
                        }
                    });
            }
        });

}

// creating the cards for website

function generatePage() {
    let allCards = "";

    employeeList.forEach(item => {
        let cardString = item.createCard();
        allCards += cardString;
    });

//     let fullHTML = `
//     <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//     <title>My Team</title>
//     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
//         integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
//     <link rel="stylesheet" href="style.css">
//     <script src="https://kit.fontawesome.com/c502137733.js"></script>
// </head>

// <body>
//     <div class="container-fluid">
//         <div class="row">
//             <div class="col-12 jumbotron mb-3 team-heading">
//                 <h1 class="text-center">My Team</h1>
//             </div>
//         </div>
//     </div>
//     <div class="container">
//         <div class="row">
//             <div class="team-area col-12 d-flex justify-content-center">
//                 {{ team }}
//             </div>
//         </div>
//     </div>
// </body>

// </html>
//  `;

//  fs.writeFile("./templates/main.html", fullHTML, function(err){
//      if (err) {
//          return console.log(err);
//      }
//  });
// }

