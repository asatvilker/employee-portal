export class Employee {
    constructor(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance,bookings, requests ) {
        this.Fname = Fname;
        this.Lname = Lname;
        this.adminID = adminID;
        this.salary = salary;
        this.permission=new Normal();
        this.username=this.getUsername();
        this.address = address;
        this.phone = phone;
        this.clientID=[];
        this.feature=new Features(limit,balance,adminID, bookings, requests);
        this.job=null
        this.email=email
        this.calendar=new Calendar(bookings,events);
      
      
    }
    updateDetails(Fname, Lname, address, phone, email){
        this.Fname = Fname;
        this.Lname = Lname;
        this.username=this.getUsername();
        this.address = address;
        this.phone = phone;
        this.email=email;
    }
    updatePassword(currentP, newP){

    }
    search(username){
        var registry = Registry.getInstance();
        var employee=registry.search(username);
        return employee
    }
    
    getUsername(){
        
        var username = this.Fname.split("")[0] + this.Lname;
        username=username.toLowerCase();
        
        return username;
    }
    viewUserGuide() {
      
    }
  
    submitQuery(query) {
      
    }
    askChatBot(query){

    }
    requestHoliday(start,end)
    {
        var result=this.feature.holidays.requestHoliday(start,end);
        return result
    }
  }

//types of employees
export class Recruit extends Employee
{
    constructor(adminID,Fname, Lname, salary, address, phone,email, events,limit,balance, bookings, requests){
        super(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests);
        this.stage=new RTDModel();
    }
    setStageTrain(){
        this.stage=this.stage.stage.Train;
        return this.stage;
    }
    setStageRecruit(){
        this.stage=this.stage.stage.Recruit;
        return this.stage;
    }
    setStageDeploy(){
        this.stage=this.stage.stage.Deploy;
        return this.stage;
    }


}

export class InternalStaff extends Employee
{
    constructor(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests){
        super(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests);
    }

} 

export class WithClient extends Employee
{
    constructor(adminID,Fname, Lname, salary, address, phone,email,  events, limit,balance,bookings, requests, clientAddress){
        super(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests);
        this.clientAddress=clientAddress
    }
    getClientAddress(){
        return this.clientAddress;
    }
    setClientAddress(address){
        this.clientAddress=address;
    }

}  
  //types of recruit
export class Graduate extends Recruit
{
    constructor(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests){
        super(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests);
    }

}
export class ExForces extends Recruit
{
    constructor(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests){
        super(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests);
    }

}
export class Returners extends Recruit
{
    constructor(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests){
        super(adminID,Fname, Lname, salary, address, phone,email, events, limit,balance, bookings, requests);
    }

}
export class RTDModel 
{
    constructor(){
        this.stage=Stage
    }

}
export const Stage = {Recruit: "recruit", Train:"train", Deploy:"deploy"}
  
//end of employee types

export class Address
{
    constructor(postcode,city,country,street,number){
        this.postcode=postcode;
        this.city=city;
        this.country=country;
        this.street=street;
        this.number=number;
    }
}
// features section

export class Features{
    constructor(limit,balance, adminID, bookings, requests){
        this.holidays= new Holidays(limit,balance, adminID, bookings,requests);
        this.announcements= new Announcements();
        
    }
}
export class Calendar{
    constructor(bookings,events){
        this.holidays=bookings;
        this.events=events;
    }
    addHoliday(){

    }
    addEvent(){

    }
    removeEvent(){

    }
    removeHoliday(){

    }
}
export class Holidays{
    constructor(limit, balance, adminID, bookings, requests){
        this.limit=limit;
        this.balance=balance;
        this.adminID=adminID;
        this.bookings=bookings;
        this.requests=requests
        
    }
    requestHoliday(start,end){
        if (this.balance> 0)
        {
            var request=new RequestH(start, end);
            this.balance -=1;
            this.requests.push(request)
            return true
        }
        else{
            return false
        }
    }
    cancelHoliday(){

    }

}
export class RequestH{
    constructor(start, end){
        this.start=start;
        this.end=end;
    }
}
export class Booking{
    constructor(start, end){
        this.start=start;
        this.end=end;
    }
}

class Registry {
    constructor(){
     if(! Registry.instance){
        this.employees=[]
        this.clients=[]
        Registry.instance = this;
     }
  
     return Registry.instance;
    }
    addEmployee(employee){
        this.employees.push(employee);
        
    }
    addClient(client){
        this.clients.push(client);
        return this
    }
    search(username){
        for (let index = 0; index < this.employees.length; index++) {
            const element = this.employees[index];
            if (element.username == username){
                return element
            }
            
        }
        return false;
    }
    searchClient(name){
        for (let index = 0; index < this.clients.length; index++) {
            const element = this.clients[index];
            if (element.name == name){
                return element
            }
            
        }
        return false;
    }
  }
  
export const RegistryInstance = new Registry();
  


export class Announcements{
    constructor(){
        this.posts=[]
    }
    addPosts(post){
        this.posts.push(post)
    }
}
export class Client{
    constructor(id,name, address){
        this.id=id;
        this.name=name;
        this.address=address;
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
    constructor(id,hRequests) {
        super();
        this.id=id
        this.holidayRequests=hRequests
        
      
    }
    createUser(adminID,Fname, Lname, salary, address, phone,email){
        var employee = new Employee(adminID,Fname, Lname, salary, address, phone,email);
        return employee
    }
    makeAdmin(employee,id,hrequests){
        employee.permission= new Admin(id,hrequests);
        return employee;
    }
    removeAdmin(employee){
        employee.permission= new Normal();
        return employee;
    }
    createPost(title,content){

    }
    updatePost(post, title, content){

    }
    deletePost(post){

    }
    acceptHoliday(username, requestID){

    }
    rejectHoliday(username, requestID){
        
    }
    assignClient(employee, client){
        employee.clientID.push(client.id);
        return employee;
    }
    unAssignClient(employee, client){
        const index = employee.clientID.indexOf(client.id);
        if (index > -1) 
        {
            employee.clientID.splice(index, 1);
        }
        
        return employee;
    }
    removeClient(){

    }
  }