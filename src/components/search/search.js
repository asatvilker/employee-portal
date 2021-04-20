import { MDBBtn, MDBCol, MDBIcon, MDBRow } from "mdbreact";
import React, { Component } from "react";
import { Business } from '../../schema/schema';
import data from '../../testData/data.json'
import './search.css'
import Select from 'react-select'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
 
        }
    }

    optionsList(){
        console.log(this.props.registry.getEmployees())
        const usersSearch = this.props.registry.getEmployees().reduce((listOfUsers, user) => { //gets list of users from registry object
            if (user.getUsername() == this.props.user.getUsername()) {
                
                return listOfUsers;
            }
            listOfUsers.push({value: user, label: user.getUsername()});
            return listOfUsers;
        }, [])
        return usersSearch;
    }

    componentWillMount(){
        
      
    }

    showInfo(event) {
       
        document.getElementById("Name").innerHTML = event.value.getFname() + " " + event.value.getLname();
        document.getElementById("Email").innerHTML = "<strong>Email: </strong>" + event.value.getEmail();
        document.getElementById("Phone").innerHTML = "<strong>Phone: </strong>" + event.value.getPhone();
        document.getElementById("Role").innerHTML = "<strong>Role: </strong>" + event.value.role.getRole();
        document.getElementById("Division").innerHTML = `<strong>Division: </strong> ${event.value.role instanceof Business?"Business":"Technical"}`;
        document.getElementById("searchContent").style.visibility = "visible";
        console.log(event.value);
    }

    sendRequest() {
        
    }
    
    render() {
        return (
        <div id="search">
            <h1>Search</h1>
            <Select id="searchList" options = {this.optionsList()} onChange = {this.showInfo}/>
            <div id="searchContent" style={{height:"85%"}} className="d-flex justify-content-center align-items center flex-column">
                <MDBIcon far icon="user-circle" size="3x"/>
                <h1 id="Name" className="mt-3"></h1>
                <MDBRow>
                    <MDBCol>
                        <p id="Email"></p>
                        <p id="Phone"></p>
                        <p id="Role"></p>
                        <p id="Division"></p>
                    </MDBCol>
                </MDBRow>
                <MDBBtn id="firstBtn" onClick = {this.sendRequest}>Start Chat</MDBBtn>
            </div>
        </div>
       )
    }
}


export default Search;