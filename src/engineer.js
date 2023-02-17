const Employee=require("./employee.js")


class Engineer extends Employee {
    /// Engineer(Number, String, String)
    constructor(id, name, email, github) {
        super(id, name, email)
        this.github=github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}


module.exports=Engineer;
