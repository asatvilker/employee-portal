import { MDBBtn, MDBCol, MDBIcon, MDBInput, MDBRow } from "mdbreact";
import React, { Component } from "react";
import {Employee, Admin} from '../../schema/schema';
import data from '../../testData/data.json'
import './holiday.css';

class Holidays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            error:false,
            start:"",
            end:""
        }
    }
     componentWillMount(){
        console.log(this.props.user)
    } 
    componentDidMount(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 

        today = yyyy+'-'+mm+'-'+dd;
        document.getElementById("start").setAttribute("min", today);
    }
    requestHoliday(start,end){
        const result=this.props.user.requestHoliday(start, end); 
        if (result === true){
            this.props.action(this.props.user) //***update parent state***
            this.setState({error:false}) //make sure a previous error message is not showing
            var elements=document.getElementsByClassName("inputError")
            var i=elements.length-1
            while (elements.length > 0) {
                const element = elements[i];
                element.classList.remove("inputError") //removes all error class names 
                i-=1
                
            }
            
        }
        else{
            this.setState({
                error:true //display error message 
            })
            var elements=document.getElementsByClassName("inputs")
            for (let index = 0; index < elements.length; index++) {
                const element = elements[index];
                element.classList.add("inputError") //adds error class name
            }
        }
        
         
        
    }
    cancelRequest(start,end){
        const result=window.confirm("Are sure you would like to cancel?");
        if (result){
            this.props.user.cancelRequest(start,end)
            this.props.action(this.props.user)
        }
        
    }
    cancelBooking(start,end){
        const result=window.confirm("Are sure you would like to cancel?");
        if (result){
            this.props.user.cancelBooking(start,end)
            this.props.action(this.props.user)
        }
    }
    
    render() {
        return (
            
       <div id="holidays">
        {
            this.props.user.getFeature() !== undefined?
            <>
                <h1>Holidays</h1>
                <MDBRow >
                    <MDBCol size="8">
                        <p className="mt-3">Current Bookings</p>
                        <div className="outerOuter">
                        <div className="d-flex holidayOuterContainer">
                            
                        {
                            this.props.user.getCalendar().getBookings().map(booking =>{
                                var startArray=booking.getStart().split("-")
                                var endArray=booking.getEnd().split("-")
                                return(
                                    <div className="d-flex flex-column align-items-center holidayComponent z-depth-2">
                                        <div className="d-flex justify-content-between w-100 pb-3">
                                            <MDBIcon far icon="clock" size="1x" className="green-text"/>
                                            <MDBBtn onClick={()=>{this.cancelBooking(booking.getStart(),booking.getEnd())}} className="cancel"><MDBIcon fas icon="times" size="1x" className="red-text"/></MDBBtn>

                                        </div>
                                        <div className="ml-2 mr-2 d-flex flex-column align-items-center">
                                            <p>{`${startArray[2]}-${startArray[1]}-${startArray[0]}`}</p>
                                            <p style={{lineHeight:"1vh"}}>.<br/>.<br/>.</p>
                                            <p>{`${endArray[2]}-${endArray[1]}-${endArray[0]}`}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        </div>
                        <p className="mt-3">Requests:</p>
                        <div className="outerOuter">
                        <div className="d-flex holidayOuterContainer">
                        {
                            this.props.user.getCalendar().getRequests().map(request => 
                            {
                                var startArray=request.getStart().split("-")
                                var endArray=request.getEnd().split("-")
                                return(
                                    <div className="d-flex flex-column align-items-center holidayComponent z-depth-2">
                                        <div className="d-flex justify-content-between w-100 pb-3">
                                            <MDBIcon far icon="clock" size="1x" className="amber-text"/>
                                            <MDBBtn onClick={()=>{this.cancelRequest(request.getStart(),request.getEnd())}} className="cancel"><MDBIcon fas icon="times" size="1x" className="red-text"/></MDBBtn>
                                        </div>
                                        <div className="ml-2 mr-2 d-flex flex-column align-items-center">
                                            <p>{`${startArray[2]}-${startArray[1]}-${startArray[0]}`}</p>
                                            <p style={{lineHeight:"1vh"}}>.<br/>.<br/>.</p>
                                            <p>{`${endArray[2]}-${endArray[1]}-${endArray[0]}`}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        </div>
                    </MDBCol>
                    <MDBCol size="4">
                        <div className="d-flex flex-column justify-content-between align-items-center h-100" style={{paddingTop:"6vh"}}>
                            <div className="d-flex flex-row justify-content-around w-100">
                                <div className="totalCard h-100 w-100 d-flex flex-column align-items-center mr-2">
                                    <p>Limit</p>
                                    <strong style={{fontSize:"3vh", color:"#1fadec"}}>{this.props.user.getFeature().getHolidays().getLimit()}</strong>
                                </div>
                                <div className="totalCard h-100 w-100 d-flex flex-column align-items-center">
                                    <p>Balance</p>
                                    <strong style={{fontSize:"3vh",color:"#1fadec"}}>{this.props.user.getFeature().getHolidays().getBalance()}</strong>
                                </div>
                            </div>
                            <div>
                                    <p>Please select dates below to request holiday</p>
                            </div>
                            <div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <label for="start">Start:</label>
                                    <MDBInput iconClass="iconClass" type="date" id="start" name="start" onChange={(e)=>{this.setState({start:e.target.value,min:e.target.value})}} className="inputs"></MDBInput>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <label for="end">End:</label>
                                    <MDBInput type="date" id="end" name="end" onChange={(e)=>{this.setState({end:e.target.value})}} min={this.state.min} className="inputs"></MDBInput>
                                </div>
                                <div className="d-flex align-items-center flex-column justify-content-center">
                                <MDBBtn onClick={()=>{this.requestHoliday(this.state.start, this.state.end)}} className="request">Submit</MDBBtn>
                                {
                                    this.state.error? <p className="red-text" style={{textAlign:"center"}}>Please check these dates haven't already been selected and that you have the balance</p>:<></> //if request not successful, this is shown
                                }
                                </div>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </>
            :
            <></>
        }
       
      </div>
        )
    }
}


export default Holidays;