import './App.css';
import React, { Component } from "react";
import {Employee, Admin, RegistryInstance} from './schema/schema';
import Home from './components/home/home';
import { Redirect } from 'react-router';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username:"",
        isAuthed:false
    }

}



componentWillMount(){
if (this.props.location.state !== undefined && this.props.location.state !== null) /* only when redirected from successful login will this be defined, so this ensures they havent tried to bypass login*/
  {
    console.log(this.props.location.state)
    this.setState({
      username:this.props.location.state.username, /*puts username in state to pass to home component later so it can load users data */
      isAuthed:true
      })
  }
 
}
render() {
    return (


       <>
       {
         this.state.isAuthed?<Home username={this.state.username}/>:<Redirect to="/" /> /* if they got here by successful login, isAuthed will be true and so it loads the home page component, otherwise redirects to login page */
       }
      </>

    )

  }
}


export default App;
