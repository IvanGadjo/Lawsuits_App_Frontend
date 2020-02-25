import React,{Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import './App.css';
import Home from '../src/components/home'
import Header from '../src/components/header'

import Cases from "./components/cases/cases";
import Documents from "./components/documents/documents";
import Employees from "./components/employees/employees";
import AddCase from "./components/cases/addCase";
import AuthService from './components/authentication/AuthService';
import withAuth from './components/authentication/withAuth';
const Auth = new AuthService();

class App extends Component {

  constructor(props) {
    super(props);
    console.log(props)
  }

  handleLogout(){
    Auth.logout();
    this.props.history.replace('/login');     // pri klik na logout redirec na login
  }

  render() {
    return(
        <Router>


          <div>
            <h2 className={"container-fluid p-3 my-3 bg-dark text-white"}>The lawsuits app of Posta</h2>

            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
            <br/><br/>

            <ul className={"nav nav-tabs"}>
              <li className={"nav-item"}><Link to={"/home"} activeclassname={"nav-link active"}>Home</Link></li>
              <li className={"nav-item"}><Link to={"/cases"} activeclassname={"nav-link"}>Cases</Link></li>
            </ul>
          </div>



          <div>



            {/*Mozebi ova ne ni treba, bidejki header go loadas vo sekoj dr endpoint, a ovoj endpoint ne se ni povikuva*/}
            <div>
              <Route  path={"/header"} exact>
                <Header/>
              </Route>
            </div>



            <div>
              <Route path={"/home"} exact>

                <Home/>
              </Route>
            </div>

            <div>
              <Route path={"/cases"} exact>

                <Cases/>
              </Route>
            </div>

            <div>
              <Route path={"/documents"} exact>

                <Documents/>
              </Route>
            </div>

            <div>
              <Route path={"/employees"} exact>

                <Employees/>
              </Route>
            </div>

            <div>
              <Route path={"/cases/add"} exact>

                <AddCase/>
              </Route>
            </div>


          </div>
        </Router>
    )
  }

}

export default withAuth(App);

