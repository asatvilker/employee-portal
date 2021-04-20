import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './fdm-logo-2018.png'
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div>
        
          
            <MDBNavbar dark expand="md" fixed="top">
              <MDBNavbarBrand >
                <img src={logo} alt=""></img>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem >
                    <MDBNavLink to="/home">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <a href="#holidays" className="nav-link Ripple-parent">Holidays</a>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Support</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        {this.props.isAuthed?<MDBNavLink to="/">Logout</MDBNavLink>:<></>}
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
        

          
       

       
      </div>
    );
  }
}

export default Navbar;