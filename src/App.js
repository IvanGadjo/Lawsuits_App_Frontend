import React,{Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import './App.css';
import Home from '../src/components/home'
import Header from '../src/components/header'
import LogIn from  '../src/components/logIn'
import Cases from "./components/cases/cases";
import Documents from "./components/documents/documents";
import Employees from "./components/employees/employees";
import AddCase from "./components/cases/addCase";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Router>


          <Redirect from={'/'} to={'/login'}/>

          <div>

            <div>

              <Route path={"/login"} exact>
                <LogIn/>
              </Route>
            </div>



            {/*Mozebi ova ne ni treba, bidejki header go loadas vo sekoj dr endpoint, a ovoj endpoint ne se ni povikuva*/}
            <div>
              <Route  path={"/header"} exact>
                <Header/>
              </Route>
            </div>



            <div>
              <Route path={"/home"} exact>
                <Header/>
                <Home/>
              </Route>
            </div>

            <div>
              <Route path={"/cases"} exact>
                <Header/>
                <Cases/>
              </Route>
            </div>

            <div>
              <Route path={"/documents"} exact>
                <Header/>
                <Documents/>
              </Route>
            </div>

            <div>
              <Route path={"/employees"} exact>
                <Header/>
                <Employees/>
              </Route>
            </div>

            <div>
              <Route path={"/cases/add"} exact>
                <Header/>
                <AddCase/>
              </Route>
            </div>


          </div>
        </Router>
    )
  }

}

export default App;

