import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import data from '../../testData/data.json';
import Navbar from "../home/navbar";
import "./login.css";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            password:"",
            errorMessage: "",
            success:false
        }
        this.handle=this.handle.bind(this)
       
    }


    
    handle(event){
        {/* loop through the array of users in the test data (data.json), if there is a match set success to true in state*/}
        console.log("hi")
        event.preventDefault()
         for (let index = 0; index < data.users.length; index++) {
            const element = data.users[index];
            if (element.username === this.state.user)
            {
                if (element.password === this.state.password)
                {
                    this.setState({success:true})
                }
                
            } 
            else {
                this.setState({errorMessage: "Wrong username or password, please try again."})
            }

            
        } 
       
        
        
    }
      
    
    render() {
        return (
            <div id="login">
            <Navbar isAuthed={false}/>
            <form onSubmit={this.handle}>
            <h2>Sign in</h2>
            <input placeholder="Username" type="text" onChange={(e)=>{this.setState({user:e.target.value})}} required></input>
            <input placeholder="Password" type="password" onChange={(e)=>{this.setState({password:e.target.value})}} required></input>
            <button type="submit" class = "loginButton">
            Login
            </button>
            {
                this.state.success?<Redirect to={{pathname: '/home',state: {username:this.state.user}}}>Login</Redirect>: this.state.errorMessage && <div className="error"> { this.state.errorMessage } </div>
                //if user details are correct, redirects the user to the home page, passing through the username
            }
            </form>
            </div>
       )
    }
}


export default Login;
