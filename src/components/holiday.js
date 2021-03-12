
import '../App.css';
import React, { Component } from "react";
import {Employee, Admin} from '../schema/schema';
import data from '../testData/data.json'

class Holidays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            
        }
    }

    
    
    /* componentWillMount(){
      
      var employee =new Employee(data.users.asatvilker.info.adminID,data.users.asatvilker.info.Fname, data.users.asatvilker.info.Lname, data.users.asatvilker.info.salary, data.users.asatvilker.info.address, data.users.asatvilker.info.phone,data.users.asatvilker.info.email, data.users.asatvilker.info.events, data.users.asatvilker.info.limit,data.users.asatvilker.info.balance,data.users.asatvilker.info.bookings, data.users.asatvilker.info.requests );
      //console.log(person.permission.constructor.name)
      this.setState({
        user:employee,
          
        }
      )
      console.log(employee.feature.holidays.bookings)
    } */
    
    
      
    
    render() {
        return (
            
       <>
        {
            this.props.user !== undefined?
            <>
            <h1>{this.props.user.Fname}</h1>
       
            <h1>{this.props.user.feature.holidays.balance}</h1>
            </>
            :
            <></>
        }
       {
            this.props.user !== undefined?
            this.props.user.feature.holidays.requests.map(request => 
                {
                    return(
                        <p>{request.start}</p>
                    )
                })
         
         :
         <></>
       }
       <button onClick={()=>{this.props.user.requestHoliday("22-08-2021", "23-08-2021"); this.props.action(this.props.user)}}>click me</button>
      </>
        )
    }
}


export default Holidays;