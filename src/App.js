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
import AddEmployee from "./components/employees/addEmployee";
import AddDocument from "./components/documents/addDocument";
import EditCase from "./components/cases/editCase";
import AllEmployees from "./components/employees/allEmployees";
import employeeService from "./myAxios/axios_employeesService";
import casesService from "./myAxios/axios_casesService";

const Auth = new AuthService();



class App extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      employees : [],
      cases: []
    }
  }

  handleLogout(){
    Auth.logout();
    this.props.history.replace('/login');     // pri klik na logout redirec na login
  }



  componentDidMount() {
    this.loadAllEmployeesFromDB();
    this.loadAllCasesFromDB();
  }

  loadAllEmployeesFromDB = () =>{
    employeeService.loadEmployees().then(resp =>{
      //console.log(resp.data);

      this.setState( (prevState) => {
        return {
          employees: resp.data
        }
      })
    });

  };

  loadAllCasesFromDB = () =>{
    casesService.loadCases().then(resp =>{
      console.log(resp.data);
      this.setState((prevState) =>{
        return{
          cases: resp.data
        }
      })
    })
  };


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
              <li className={"nav-item"}><Link to={"/allEmployees"} activeclassname={"nav-link"}>All Employees</Link></li>
            </ul>
          </div>




          {/* todo: Different paths of the app*/}

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
                <Cases cases={this.state.cases}/>
              </Route>
            </div>

            <div>
              <Route path={"/documents"} exact>
                <Documents/>
              </Route>
            </div>

            <div>
              <Route path={"/employees/:caseId"} exact render={(props)=>{
                console.log(props);
                return <Employees theCaseId={props.match.params.caseId}/>
              }}/>
            </div>

            <div>
              <Route path={"/cases/add"} exact>
                <AddCase/>
              </Route>
            </div>

            <div>
              <Route path={"/cases/edit"} exact>
                <EditCase/>
              </Route>
            </div>

            <div>
              <Route path={"/employees/add"} exact>
                <AddEmployee/>
              </Route>
            </div>

            <div>
              <Route path={"/documents/add"} exact>
                <AddDocument/>
              </Route>
            </div>

            <div>
              <Route path={"/allEmployees"} exact>
                <AllEmployees employees={this.state.employees}/>
              </Route>
            </div>

          </div>
        </Router>
    )
  }

}

export default withAuth(App);

