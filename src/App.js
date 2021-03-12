import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import {Employee, Admin, RegistryInstance} from './schema/schema';
import * as objects from './schema/schema'
import data from './testData/data.json'
import Holidays from './components/holiday';
const {REACT_APP_API_KEY}=process.env;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            
        }
        this.updateHolidays = this.updateHolidays.bind(this);
    }

    
    
    componentWillMount(){
      console.log(process.env)
      var registry = RegistryInstance
      
      for (let index = 0; index < data.users.length; index++) {
        const element = data.users[index];
        var employee =new Employee(element.info.adminID,element.info.Fname, element.info.Lname, element.info.salary,element.info.address, element.info.phone,element.info.email, element.info.events, element.info.limit,element.info.balance,element.info.bookings,element.info.requests );

        registry.addEmployee(employee)
        
      }
      
      var currentEmployee = registry.search("asatvilker");
      console.log(currentEmployee)

      this.setState({
        user:currentEmployee,
          
        }
      )
      
    }
    
    updateHolidays(user) {
      this.setState({user:user})
    }
      
    
    render() {
        return (
            <div className="App">
                <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Holidays user={this.state.user} action={this.updateHolidays}/>
       </header>
       </div>
       
       )
    }
}


export default App;










