import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Switch, Route} from 'react-router';
import Login from './components/login/login';
import { BrowserRouter, useParams } from 'react-router-dom';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
             <Route exact path="/" component={Login}/>
             <Route exact path="/home" component={App}/> {/*creates route for home page and login*/}
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
