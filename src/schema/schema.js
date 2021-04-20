export class Employee {
    #Fname;
    #Lname;
    #adminID = "";
    #salary = "";
    #permission = new Normal();
    #username;
    #address;
    #phone;
    #clientID = [];
    #feature;
    #job = null
    #email = ""
    #calendar;

    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role) {
        this.#Fname = Fname;
        this.#Lname = Lname;
        this.#adminID = adminID;
        this.#salary = salary;
        this.#permission = new Normal();
        this.role = this.setRole(role)
        this.#username = this.getUsername();
        this.#address = new Address(address.postcode, address.city, address.country, address.street, address.number);
        this.#phone = phone;
        this.#clientID = [];
        this.#feature = new Features(limit, balance, adminID);
        this.#job = null
        this.#email = email
        this.#calendar = new Calendar(bookings, requests);


    }

    updateDetails(Fname, Lname, phone, email, postcode, city, country, street, number) {
        var first = Fname.charAt(0).toUpperCase() + Fname.slice(1).toLowerCase()
        var last = Lname.charAt(0).toUpperCase() + Lname.slice(1).toLowerCase()

        this.#Fname = first;
        this.#Lname = last;
        this.#username = this.getUsername();
        this.#phone = phone;
        this.#email = email;
        this.#address= new Address(postcode,city,country,street,number);
    }

    updatePassword(currentP, newP) {

    }

    search(username) {
        var registry = Registry.getInstance();
        var employee = registry.search(username);
        return employee
    }

    getUsername() {
        if (this.#Lname.split(" ").length > 1) {

            var lastName = this.#Lname.split(" ")[(this.#Lname.split(" ").length) - 1]
        } else {
            var lastName = this.#Lname
        }
        var username = this.#Fname.split("")[0] + lastName;
        username = username.toLowerCase();

        return username;
    }

    getFullName() {
        return `${this.#Fname} ${this.#Lname}`
    }

    getFname() {
        return this.#Fname
    }

    getLname() {
        return this.#Lname
    }

    getPostcode() {
        return this.#address.postcode
    }

    getEmail() {
        return this.#email
    }

    getPhone() {
        return this.#phone
    }

    getSalary() {
        return this.#salary
    }

    getAddress() {
        return this.#address
    }

    getFeature() {
        return this.#feature
    }

    getCalendar() {
        return this.#calendar
    }

    cancelBooking(start,end){
      var startDate = new Date(Date.parse(start))
      var endDate = new Date(Date.parse(end))
      var bookings=this.#calendar.getBookings()
      for (let index = 0; index < bookings.length; index++) {
        const element = bookings[index];
        if (element.getStart()===start && element.getEnd()===end){
          bookings.splice(index,1)
          this.#feature.getHolidays().cancelHoliday(startDate,endDate)
          
        }
        
      }
    }

    cancelRequest(start,end){
      var startDate = new Date(Date.parse(start))
      var endDate = new Date(Date.parse(end))
      var requests=this.#calendar.getRequests()
      for (let index = 0; index < requests.length; index++) {
        const element = requests[index];
        if (element.getStart()===start && element.getEnd()===end){
          requests.splice(index,1)
          this.#feature.getHolidays().cancelHoliday(startDate,endDate)
        }
        
      }
    }

    requestHoliday(start, end) {

        var startDate = new Date(Date.parse(start))
        var endDate = new Date(Date.parse(end))

        for (let index = 0; index < this.#calendar.getBookings().length; index++) {
            const start2 = this.#calendar.getBookings()[index].getStart();
            const end2 = this.#calendar.getBookings()[index].getEnd();
            var startDate2 = new Date(Date.parse(start2))
            var endDate2 = new Date(Date.parse(end2))
            if (startDate.getTime() >= startDate2.getTime() && startDate.getTime() <= endDate2.getTime() || endDate.getTime() >= startDate2.getTime() && endDate.getTime() <= endDate2.getTime() || startDate.getTime() < startDate2.getTime() && endDate.getTime() > endDate2.getTime()) {
                return false
            }

        }
        for (let index = 0; index < this.#calendar.getRequests().length; index++) {
            const start2 = this.#calendar.getRequests()[index].getStart();
            const end2 = this.#calendar.getRequests()[index].getEnd();
            var startDate2 = new Date(Date.parse(start2))
            var endDate2 = new Date(Date.parse(end2))
            if (startDate.getTime() >= startDate2.getTime() && startDate.getTime() <= endDate2.getTime() || endDate.getTime() >= startDate2.getTime() && endDate.getTime() <= endDate2.getTime() || startDate.getTime() < startDate2.getTime() && endDate.getTime() > endDate2.getTime()) {
                return false
            }

        }
        var result = this.#feature.getHolidays().requestHoliday(startDate, endDate);
        if (result) {
            var request = new RequestH(start, end);
            // insert here code to check for clashes in current bookings and requests (this.calendar)
            this.#calendar.addRequest(request) //if it returns true so is within balance and passed validation, add to main calendar
            return true //tells the code if it was successful or not
        } else {
            return false
        }

    }

    setRole(role) {
        if (role === "General") {
            return new General(role)
        } else if (role === "ProjectSupportOfficer") {
            return new ProjectSupportOfficer(role)
        } else if (role === "BusinessAnalyst") {
            return new BusinessAnalyst(role)
        } else if (role === "TechnicalOperations") {
            return new TechnicalOperations(role)
        } else if (role === "BIDataAnalyst") {
            return new BIDataAnalyst(role)
        } else if (role === "SoftwareTestAnalyst") {
            return new SoftwareTestAnalyst(role)
        } else if (role === "RoboticsProcessAutomation") {
            return new RoboticsProcessAutomation(role)
        } else if (role === "SoftwareDeveloper") {
            return new SoftwareDeveloper(role)
        }

    }
    
}


//types of employees
export class Recruit extends Employee {
    #rtdModel;

    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage) {
        super(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role);
        this.#rtdModel = new RTDModel(stage);
    }

    getStage() {
        return this.#rtdModel.getStage()
    }


}

export class InternalStaff extends Employee {
    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role) {
        super(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role);
    }

}

export class WithClient extends Employee {
    #clientAddress;

    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, clientAddress) {
        super(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role);
        this.#clientAddress = clientAddress
    }

    getClientAddress() {
        return this.#clientAddress;
    }

    setClientAddress(address) {
        this.#clientAddress = address;
    }

}

//types of recruit
export class Graduate extends Recruit {
    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage) {
        super(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage);
    }

}

export class ExForces extends Recruit {
    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage) {
        super(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage);
    }

}

export class Returners extends Recruit {
    constructor(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage) {
        super(adminID, Fname, Lname, salary, address, phone, email, events, limit, balance, bookings, requests, role, stage);
    }

}

export class RTDModel {
    #stage;

    constructor(stage) {
        this.#stage = Stage[stage]
    }

    setRecruit() {
        this.#stage = Stage.Recruit
    }

    setTrain() {
        this.#stage = Stage.Train
    }

    setDeploy() {
        this.#stage = Stage.Deploy
    }

    getStage() {
        return this.#stage
    }

}

export const Stage = {Recruit: "Recruit", Train: "Train", Deploy: "Deploy"}

//end of employee types

//employee roles
export class JobRole {
    #name
    constructor(name) {
        this.#name=name;
    }
    getRole()
    {
        return this.#name
    }
}

export class Business extends JobRole {
    constructor(name) {
        super(name)
    }
}

export class Technical extends JobRole {
    constructor(name) {
        super(name)
    }
}

export class General extends Business {
    constructor(name) {
        super(name)
    }
}

export class ProjectSupportOfficer extends Business {
    constructor(name) {
        super(name)
    }
}

export class BusinessAnalyst extends Business {
    constructor(name) {
        super(name)
    }
}

export class TechnicalOperations extends Technical {
    constructor(name) {
        super(name)
    }
}

export class BIDataAnalyst extends Technical {
    constructor(name) {
        super(name)
    }
}

export class SoftwareTestAnalyst extends Technical {
    constructor(name) {
        super(name)
    }
}

export class RoboticsProcessAutomation extends Technical {
    constructor(name) {
        super(name)
    }
}

export class SoftwareDeveloper extends Technical {
    constructor(name) {
        super(name)
    }
}


export class Address {
    constructor(postcode, city, country, street, number) {
        this.postcode = postcode;
        this.city = city;
        this.country = country;
        this.street = street;
        this.number = number;
    }
}

// features section

export class Features {
    #holidays;
    #announcements;

    constructor(limit, balance, adminID) {
        this.#holidays = new Holidays(limit, balance, adminID);
        this.#announcements = new Announcements();

    }

    getHolidays() {
        return this.#holidays
    }

    getAnnouncements() {
        return this.#announcements
    }
}

export class Calendar {
    #bookings;
    #requests;

    constructor(bookings, requests) {
        this.#bookings = this.addAllBookings(bookings);
        this.#requests = this.addAllRequests(requests);
    }

    addAllBookings(bookings) {
        var array = []
        for (let index = 0; index < bookings.length; index++) {
            const element = bookings[index];
            var booking = new Booking(element.start, element.end)
            array.push(booking)
        }
        return array
    }

    addAllRequests(requests) {
        var array = []
        for (let index = 0; index < requests.length; index++) {
            const element = requests[index];
            var request = new RequestH(element.start, element.end)
            array.push(request)
        }
        return array
    }

    addHoliday(booking) {
        this.#bookings.push(booking)
    }

    addRequest(request) {
        this.#requests.push(request)
    }

    addEvent() {

    }

    removeEvent() {

    }

    getBookings() {
        return this.#bookings

    }

    getRequests() {
        return this.#requests
    }
}

export class Holidays {
    #limit;
    #balance;
    #adminID;

    constructor(limit, balance, adminID) {
        this.#limit = limit;
        this.#balance = balance;
        this.#adminID = adminID;


    }

    requestHoliday(start, end) {
        //validate the request here
        var date1 = new Date(start);
        var date2 = new Date(end);

        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates 
        var Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;
        if (this.#balance >= Difference_In_Days) {
            this.#balance -= Difference_In_Days;
            return true
        } else {
            return false
        }
    }

    getLimit() {
        return this.#limit
    }

    getBalance() {
        return this.#balance
    }

    cancelHoliday(start,end) {
      var date1 = new Date(start);
      var date2 = new Date(end);
      var Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates 
      var Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;
      console.log(Difference_In_Days)
      this.#balance += Difference_In_Days; //add back to balance
      
    }

}

export class RequestH {
    #start;
    #end;

    constructor(start, end) {
        this.#start = start;
        this.#end = end;
    }

    getStart() {
        return this.#start
    }

    getEnd() {
        return this.#end
    }
}

export class Booking {
    #start;
    #end;

    constructor(start, end) {
        this.#start = start;
        this.#end = end;
    }

    getStart() {
        return this.#start
    }

    getEnd() {
        return this.#end
    }
}

class Registry {
    #employees;
    #clients;

    constructor() {
        if (!Registry.instance) {
            this.#employees = []
            this.#clients = []
            Registry.instance = this;
        }

        return Registry.instance;
    }

    addEmployee(employee) {
        this.#employees.push(employee);

    }

    addClient(client) {
        this.#clients.push(client);
        return this
    }

    search(username) {
        for (let index = 0; index < this.#employees.length; index++) {
            const element = this.#employees[index];
            if (element.getUsername() === username) {
                return element
            }

        }
        return false;
    }

    searchClient(name) {
        for (let index = 0; index < this.#clients.length; index++) {
            const element = this.#clients[index];
            if (element.name == name) {
                return element
            }

        }
        return false;
    }
    getEmployees(){
        return this.#employees
    }
}

export const RegistryInstance = new Registry();


export class Announcements {
    #posts;

    constructor() {
        this.#posts = []
    }

    addPost(post) {
        this.#posts.push(post)
    }

    getPosts() {
        return this.#posts
    }
}

export class Post {
    #id;
    #title
    #content
    #date

    constructor(id, title, content, date) {
        this.#id = id
        this.#title = title
        this.#content = content
        this.#date = date
    }

    getId() {
        return this.#id
    }

    getTitle() {
        return this.#title
    }

    getContent() {
        return this.#content
    }

    getDate() {
        return this.#date
    }
}

export class Client {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

export class PermissionRole {
    constructor() {


    }
}

export class Normal extends PermissionRole {
    constructor() {
        super();

    }
}

export class Admin extends PermissionRole {
    constructor(id, hRequests) {
        super();
        this.id = id
        this.holidayRequests = hRequests


    }

    createUser(adminID, Fname, Lname, salary, address, phone, email) {
        var employee = new Employee(adminID, Fname, Lname, salary, address, phone, email);
        return employee
    }

    makeAdmin(employee, id, hrequests) {
        employee.permission = new Admin(id, hrequests);
        return employee;
    }

    removeAdmin(employee) {
        employee.permission = new Normal();
        return employee;
    }

    createPost(title, content) {

    }

    updatePost(post, title, content) {

    }

    deletePost(post) {

    }

    acceptHoliday(username, requestID) {

    }

    rejectHoliday(username, requestID) {

    }

    assignClient(employee, client) {
        employee.clientID.push(client.id);
        return employee;
    }

    unAssignClient(employee, client) {
        const index = employee.clientID.indexOf(client.id);
        if (index > -1) {
            employee.clientID.splice(index, 1);
        }

        return employee;
    }

    removeClient() {

    }
}