import { MDBCol, MDBRow } from "mdbreact";
import React, { Component } from "react";
import {Employee, RegistryInstance, Recruit, Graduate, ExForces, Returners, InternalStaff, WithClient} from '../../schema/schema';
import data from '../../testData/data.json'
import Announcement from "../announcements/announcement";
import Holidays from '../holidays/holiday';
import PersonalInfo from "../personalInfo/personalInfo";
import Search from "../search/search";
import './home.css'
import Navbar from "./navbar";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:undefined,
            registry:null
        }
        this.update = this.update.bind(this);
    }

    
    
    componentDidMount(){
      var registry = RegistryInstance //gets instance of registry (singleton pattern)
      if (registry.getEmployees().length === 0){ //as we have used singleton, we must check there if there was already a registry before poppulating with all users or we get duplicates

      
      for (let index = 0; index < data.users.length; index++) { //loops through all users in test data, checks the type of user and creates the relevant specialised type of employee
        const element = data.users[index];
        if (element.info.type === "Graduate") {
            var employee =new Graduate(element.info.adminID,element.info.Fname, element.info.Lname, element.info.salary,element.info.address, element.info.phone,element.info.email, element.info.events, element.info.limit,element.info.balance,element.info.bookings,element.info.requests,element.info.role,element.info.stage );
            registry.addEmployee(employee) //calls registry function to add the eployee to the list of employees held in registry
        }
        else if (element.info.type === "ExForces") {
            var employee =new ExForces(element.info.adminID,element.info.Fname, element.info.Lname, element.info.salary,element.info.address, element.info.phone,element.info.email, element.info.events, element.info.limit,element.info.balance,element.info.bookings,element.info.requests,element.info.role,element.info.stage );
            registry.addEmployee(employee)
        }
        else if (element.info.type === "Returners") {
            var employee =new Returners(element.info.adminID,element.info.Fname, element.info.Lname, element.info.salary,element.info.address, element.info.phone,element.info.email, element.info.events, element.info.limit,element.info.balance,element.info.bookings,element.info.requests,element.info.role,element.info.stage );
            registry.addEmployee(employee)
        }
        else if (element.info.type === "InternalStaff") {
            var employee =new InternalStaff(element.info.adminID,element.info.Fname, element.info.Lname, element.info.salary,element.info.address, element.info.phone,element.info.email, element.info.events, element.info.limit,element.info.balance,element.info.bookings,element.info.requests,element.info.role);
            registry.addEmployee(employee)
        }
        else if (element.info.type === "WithClient") {
            var employee =new WithClient(element.info.adminID,element.info.Fname, element.info.Lname, element.info.salary,element.info.address, element.info.phone,element.info.email, element.info.events, element.info.limit,element.info.balance,element.info.bookings,element.info.requests,element.info.role,element.info.withClient );
            registry.addEmployee(employee)
            
        }
        
    } 
      }
      
      var currentEmployee = registry.search(this.props.username); //this function takes a username and returns the employee object that matches
      console.log(currentEmployee) //stores in state, IMPORTANT-this is where all child components will get the user data from and update it so all components will be consistent

      this.setState({
        user:currentEmployee,
        registry:registry
          
        }
      )
      
    }
    
    update(user) { //IMPORTANT- all child components are passed this function so whenever they change the user object, they must call this to update overall state
      this.setState({user:user})
    }
      
    
    render() {

        return (
      <div id="home">
        { 
            this.state.user !== undefined?
            <> 
                <Navbar isAuthed={true}/>
                <div className="banner flex-center">
                    <h1>Welcome back, {this.state.user.getFname()}</h1>
                </div>
               
                <MDBRow className="pt-5 homeRows" center> 
                    <MDBCol size="12" md="7">
                        <Announcement />
                    </MDBCol>
                    <MDBCol size="12" md="5">
                        <PersonalInfo user={this.state.user} action={this.update} />
                    </MDBCol>
                </MDBRow>
                
               
            </>
            :
            <></>
        }
        
        {
            this.state.registry !== null?
           
                <MDBRow className="homeRows">
                    <MDBCol size="12" md="8">

                        <Holidays user={this.state.user} action={this.update}/>
                    </MDBCol>
                    <MDBCol size="12" md="4">
                        <Search user={this.state.user} action={this.update} registry={this.state.registry}/>
                    </MDBCol>
                </MDBRow>
                
          
                :
            <></>
        }

    
      </div>
       )
    }
}


export default Home;
