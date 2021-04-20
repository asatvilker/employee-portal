import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow , MDBInput} from "mdbreact";
import React, {Component} from "react";
import { Business, Recruit, WithClient } from '../../schema/schema';
import data from '../../testData/data.json'
import './personalInfo.css'

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fname : this.props.user.getFname(),
            Lname : this.props.user.getLname(),
            phone : this.props.user.getPhone(),
            email : this.props.user.getEmail(),
            postcode : this.props.user.getPostcode(),
            city: this.props.user.getAddress().city,
            country: this.props.user.getAddress().country,
            street: this.props.user.getAddress().street,
            number: this.props.user.getAddress().number
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
            event.preventDefault();
            alert('Details updated');
            this.props.user.updateDetails(this.state.Fname,this.state.Lname,
                this.state.phone,this.state.email,
                this.state.postcode,this.state.city,this.state.country,
                this.state.street,
                this.state.number
            )
            this.props.action(this.props.user)    //***this line is an example of how to update details in the state***
            this.handle()
        }


    handle() {
        var element = document.getElementsByClassName("flip-card")[0]

        document.getElementsByClassName("show").length !== 0 ? element.classList.remove("show") : element.classList.add("show")
    }

    render() {
        return (


            <div id="info">
                <div className="d-flex justify-content-between">
                    <h1>Personal info</h1>
                    <MDBBtn onClick={() => {
                        this.handle()
                    }} circle><MDBIcon icon="pencil-alt" className="blue-text" size="2x"/></MDBBtn>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front d-flex flex-column justify-content-center">
                            <MDBIcon far icon="user-circle" size="3x"/>
                            <h1 className="mt-3">{this.props.user.getFullName()}</h1>
                            
                            <p className="mb-0"><strong>{this.props.user instanceof Recruit?"Recruit":this.props.user instanceof WithClient? "With Client": "Internal staff"}</strong>
                            </p> {/* gets the name of the type of user e.g. ex forces */}

                            {
                                this.props.user instanceof WithClient ?
                                    <p>Client address: {this.props.user.getClientAddress().postcode}</p> : <></> /* if they are a with client, they have extra attribitue for client address, this displays it*/
                            }
                            {
                                this.props.user instanceof Recruit ?
                                    <p>Stage of recruitment: {this.props.user.getStage()}</p> : <></> /* if they are a recruit, they have extra attribitue for rtdmodel, this displays it*/
                            }
                            <MDBRow>
                                <MDBCol size="6" className="d-flex flex-column align-items-end">
                                    <p><strong>Username</strong>: {this.props.user.getUsername()}</p>
                                    <p><strong>Email</strong>: {this.props.user.getEmail()}</p>
                                    <p><strong>Phone</strong>: {this.props.user.getPhone()}</p>
                                </MDBCol>
                                <MDBCol size="6" className=" d-flex flex-column align-items-start">
                                    {
                                        this.props.user.role instanceof Business?
                                        <p><strong>Division</strong>: Business</p> 
                                        :
                                        <p><strong>Division</strong>: Technical</p> 
                                    }
                                  
                                  
                                    <p><strong>Role</strong>: {this.props.user.role.getRole()}
                                    </p> {/* gets the name of their role, e.g software developer */}
                                    <p><strong>Home address</strong>: {this.props.user.getPostcode()}</p>
                                </MDBCol>
                            </MDBRow>


                        </div>

                        <div className="flip-card-back">
                                <MDBContainer fluid={true} id="updateDetailsContainer">
                                    <h1>Update details</h1>
                                    <form onSubmit={this.handleSubmit}>
                                        <MDBRow>
                                            <MDBCol>
                                                    <MDBInput size="sm" label="First Name" name="Fname" type="text" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getFname()} />
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput size="sm" label="Last Name" name="Lname" type="text" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getLname()}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput size="sm" label="Email" name="email" type="email" required={true} pattern="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"  onChange={this.handleInputChange} valueDefault={this.props.user.getEmail()}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput size="sm" label="Phone" name="phone" type="tel" required={true} pattern="^[0-9]*$" onChange={this.handleInputChange} valueDefault={this.props.user.getPhone()}/>
                                            </MDBCol>
                                        </MDBRow>
                                        <label>Address:</label>
                                        <MDBRow >
                                            <MDBCol>
                                                <MDBInput width ="auto" size="sm" label="Number" name="number" type="number" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getAddress().number}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput width ="auto" size="sm" label="Street" name="street" type="text" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getAddress().street}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput size="sm" label="Country" name="country" type="text" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getAddress().country}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput size="sm" label="City" name="city" type="text" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getAddress().city}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput size="sm" label="Postcode" name="postcode" type="text" required={true} onChange={this.handleInputChange} valueDefault={this.props.user.getAddress().postcode}/>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow center={true}>
                                            <MDBBtn type="submit" className="submitBtn">Submit</MDBBtn>
                                        </MDBRow>
                                    </form>
                                </MDBContainer>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}


export default PersonalInfo;