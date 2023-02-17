const Employee=require("./employee.js")


class Manager extends Employee {
    /// Manager(Number, String, String)
    constructor(id, name, email, officeNumber) {
        super(id, name, email)
        this.officeNumber=officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}


module.exports=Manager;
