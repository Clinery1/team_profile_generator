const Employee=require("./employee.js")
const Manager=require("./manager.js")
const Engineer=require("./engineer.js")
const Intern=require("./intern.js")

const inquirer=require("inquirer");

const fs=require("fs");


async function main() {
    let users=[];
    for (;;) {
        const employee=await prompt_for_user();
        users.push(employee);
        const another=(await inquirer.prompt({
            type:"confirm",
            name:"0",
            message:"Add another employee?",
        }))[0];
        if (!another) {
            break;
        }
    }

    // generate HTML
    let out="<!DOCTYPE html><html><body><ul>";
    out+="<h1>Employees</h1>";
    for (let i=0;i<users.length;i+=1) {
        let user=users[i];
        out+="<li>";

        out+="<h2>"+user.getName()+"</h2>";
        out+="<ul>";

        out+="<li>ID: "+user.getId()+"</li>";
        out+="<li>Email: "+user.getEmail()+"</li>";
        switch (user.getRole()) {
            case "Manager":
                out+="<li>Office #: "+user.getOfficeNumber()+"</li>";
                break;
            case "Engineer":
                out+="<li>Github: "+user.getGithub()+"</li>";
                break;
            case "Intern":
                out+="<li>School: "+user.getSchool()+"</li>";
                break;
            default:
                unreachable();
        }
        out+="</ul>";

        out+="</li>";
    }
    out+="</ul></body></html>";

    // write the data to the file
    let file=fs.openSync("out.html","w");
    fs.writeSync(file,out);
    fs.closeSync(file);
}

async function prompt_for_user() {
    const user_type=await inquirer.prompt({
        type:"list",
        name:"0",
        message:"What type of user is this?",
        choices:["Manager","Engineer","Intern"],
    });

    switch (user_type[0]) {
        case "Manager":
            return await prompt_manager();
        case "Engineer":
            return await prompt_engineer();
        case "Intern":
            return await prompt_intern();
        default:
            unreachable();
    }
}

async function prompt_employee() {
    const id=(await inquirer.prompt({
        name:"0",
        message:"What is the ID of the employee?",
        type:"number",
    }))[0];

    const name=(await inquirer.prompt({
        name:"0",
        message:"What is the name of the employee?",
        type:"input",
    }))[0];

    const email=(await inquirer.prompt({
        name:"0",
        message:"What is the employee's email?",
        type:"input",
    }))[0];

    return {id,name,email};
}

async function prompt_manager() {
    const {id,name,email}=await prompt_employee();

    const office_number=(await inquirer.prompt({
        name:"0",
        message:"What is the manager's office number?",
        type:"input",
    }))[0];

    return new Manager(id,name,email,office_number);
}

async function prompt_engineer() {
    const {id,name,email}=await prompt_employee();

    const github=(await inquirer.prompt({
        name:"0",
        message:"What is the engineer's github?",
        type:"input",
    }))[0];

    return new Engineer(id,name,email,github);
}

async function prompt_intern() {
    const {id,name,email}=await prompt_employee();

    const school=(await inquirer.prompt({
        name:"0",
        message:"What is the intern's school name?",
        type:"input",
    }))[0];

    return new Intern(id,name,email,school);
}

function unreachable() {
    throw "Unreachable code";
}


main()
