import React,{Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import './App.css';
import Home from '../src/components/home'
import Header from '../src/components/header'
import Cases from "./components/cases/cases";
import Documents from "./components/documents/documents";
import EmployeesOfCase from "./components/employees/employeesOfCase";
import AddCase from "./components/cases/addCase";
import AuthService from './components/authentication/AuthService';
import withAuth from './components/authentication/withAuth';
import AddEmployee from "./components/employees/addEmployee";
import AddDocument from "./components/documents/addDocument";
import EditCase from "./components/cases/editCase";
import AllEmployees from "./components/employees/allEmployees";
import employeeService from "./myAxios/axios_employeesService";
import casesService from "./myAxios/axios_casesService";
import AddLawsuitEntity from "./components/lawsuitEntities/addLawsuitEntity";
import lawsuitEntitiesService from "./myAxios/axios_lawsuitEntitiesService";
import AllLawsuitEntities from "./components/lawsuitEntities/allLawsuitEntities";
import EditLawsuitEntity from "./components/lawsuitEntities/editLawsuitEntity";
import EditDocument from "./components/documents/editDocument";
import courtsService from "./myAxios/axios-courtsService";
import documentsService from "./myAxios/axios_documentsService";
import EditEmployee from "./components/employees/editEmployee";
import ConfirmOldPassword from "./components/employees/confirmOldPassword";
import credentialsService from "./myAxios/axios_credentialsService";

const Auth = new AuthService();



class App extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      employees : [],
      cases: [],
      loggedInEmployee: {},
      lawsuitEntities: [],
      courts: []
    }
  }

  componentDidMount() {
    this.loadAllEmployeesFromDB();
    this.loadAllCasesFromDB();
    this.loadAllLawsuitEntitiesFromDB();
    this.loadAllCourtsFromDB();
  }



  handleLogout(){
    Auth.logout();
    this.props.history.replace('/login');     // pri klik na logout redirec na login
  }

  setLoggedInEmployeeInfoToState(){
    let usrnm = this.props.user.sub;
    let res = {};

    this.state.employees.forEach(e =>{
      let empusrnm = e.username;
      //console.log(empusrnm);
      if(empusrnm === usrnm) {
        res = e;
      }
    });

    this.setState({
      loggedInEmployee: res
    })
  }


  // todo: Functions for loading stuff from DB directly on start:
  loadAllEmployeesFromDB = () =>{
    employeeService.loadEmployees().then(resp =>{
      //console.log(resp.data);

      this.setState( (prevState) => {
        return {
          employees: resp.data
        }
      });


      this.setLoggedInEmployeeInfoToState();
    });


  };

  loadAllCasesFromDB = () =>{
    casesService.loadCases().then(resp =>{
      //console.log(resp.data);
      this.setState((prevState) =>{
        return{
          cases: resp.data
        }
      })
    })
  };

  loadAllLawsuitEntitiesFromDB = () =>{
    lawsuitEntitiesService.loadLawsuitEntities().then(resp =>{
      this.setState((prevState) =>{
        return{
          lawsuitEntities: resp.data
        }
      })
    })
  };

  loadAllCourtsFromDB = () =>{
    courtsService.loadCourts().then(resp =>{
      this.setState((prevState)=>{
        return{
          courts: resp.data
        }
      })
    })
  };



  // todo: Functions for form submitting
  addNewLawsuitEntityToDB = (newLawsuitEntity) =>{
    lawsuitEntitiesService.addNewLawsuitEntity(newLawsuitEntity).then(resp =>{

      this.setState({
        lawsuitEntities: [...this.state.lawsuitEntities,resp.data]
      });
    })
  };

  editLawsuitEntity = (editedLawsuitEntity, oldId) =>{
    lawsuitEntitiesService.editLawsuitEntity(editedLawsuitEntity, oldId).then(resp =>{
      // this.setState({
      //   lawsuitEntities: [...this.state.lawsuitEntities, resp.data]
      // })
      this.loadAllLawsuitEntitiesFromDB();
    })
  };

  addNewCaseToDB = (newCase) =>{
    casesService.addNewCase(newCase).then(resp =>{

      casesService.addEmployeesToCase(newCase.employeesToAdd, resp.data.id);

      this.setState({
        cases: [...this.state.cases,resp.data]
      })
    })
  };

  addEmployeesToCase = (employeesToAdd, caseId) =>{
    casesService.addEmployeesToCase(employeesToAdd,caseId);
  };

  editCase = (editedCase, oldId) =>{
    casesService.editCase(editedCase,oldId).then(resp =>{
      // this.setState({
      //   cases: [...this.state.cases,resp.data]
      // })
      this.loadAllCasesFromDB();
    })
  };

  editDocument = (editedDoc, oldId) =>{
    documentsService.editDoc(editedDoc,oldId).then(resp =>{
      this.loadAllCasesFromDB();
    })
  };

  editBasicEmployeeInfo = (editedEmployee, oldId)=>{
    employeeService.editBasicEmployeeInfo(editedEmployee,oldId).then(resp =>{
      this.loadAllEmployeesFromDB();
    })
  };

  confirmPasswordOfEmployee = (username,password) =>{
    credentialsService.confirmPass(username,password)
  };

  changeEmployeeCredentials = (employeeId,username,password) =>{
    credentialsService.changeCredentialsOfEmployee(employeeId,username,password).then(resp=>{
      //console.log("Uspeavme! sega sredi");

      this.props.user.sub = username;

      // mora da go trgens tokenot za da projde bez problemi login requestot (ako najde token AuthService pri fetch
      // probuva da go decode - na line 39
      // i ke imas frki)
      localStorage.removeItem("id_token");
      //console.log(resp)
      localStorage.setItem("id_token",resp.data.token);

      this.loadAllEmployeesFromDB()
    })
  };






  render() {//console.log(this.props.user)
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
              <li className={"nav-item"}><Link to={"/allLawsuitEntities"}>All lawsuit entities</Link></li>
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
                <Home employee={this.state.loggedInEmployee}/>
              </Route>
            </div>



            {/*CASES*/}
            <div>
              <Route path={"/cases"} exact>
                <Cases cases={this.state.cases}/>
              </Route>
            </div>

            <div>
              <Route path={"/cases/add"} exact>
                <AddCase employees={this.state.employees}
                         lawsuitEntities={this.state.lawsuitEntities}
                         onAddNewCase={this.addNewCaseToDB}
                         cases={this.state.cases}
                         loggedInEmployee={this.state.loggedInEmployee}/>
              </Route>
            </div>

            <div>
              <Route path={"/cases/edit/:caseId"} exact render={(props)=>{
                return <EditCase theCase={props.location.theCase}
                                 lawsuitEntities={this.state.lawsuitEntities}
                                 loggedInEmployee={this.state.loggedInEmployee}
                                 onEditCase={this.editCase}/>
              }}>

              </Route>
            </div>


            {/*LAWSUIT ENTITIES*/}

            <div>
              <Route path={"/allLawsuitEntities"} exact>
                <AllLawsuitEntities lawsuitEntities={this.state.lawsuitEntities}/>
              </Route>
            </div>

            <div>
              <Route path={"/lawsuitEntities/add"} exact render={(props)=>{
                return <AddLawsuitEntity onAddLawsuitEntity={this.addNewLawsuitEntityToDB}
                                         redirectPath={props.location.redirectPath}/>
              }}>
              </Route>
            </div>

            <div>
              <Route path={"/lawsuitEntities/edit/:lawsuitEntityId"} exact render={(props)=>{
                return <EditLawsuitEntity onEditLawsuitEntity={this.editLawsuitEntity}
                                          theLawsuitEntity={props.location.theLawsuitEntity}/>
              }}>

              </Route>
            </div>


            {/*DOCUMENTS*/}
            <div>
              <Route path={"/documents/:caseId"} exact render={(props)=>{
                return <Documents theCaseId={props.match.params.caseId}/>
              }}/>
            </div>

            <div>
              <Route path={"/documents/add/:caseId"} exact render={(props)=>{
                return <AddDocument theCaseId={props.match.params.caseId}/>
              }}>
              </Route>
            </div>

            <div>
              <Route path={"/documents/edit/:caseId"} exact render={(props)=>{
                return <EditDocument onEditDocument={this.editDocument}
                                     theDocumentInfo={props.location.theDocumentInfo}
                                     theCaseId={props.location.theCaseId}
                                     courts={this.state.courts}
                                     loggedInEmployee={this.state.loggedInEmployee}/>
              }}>
              </Route>
            </div>




            {/*EMPLOYEES*/}
            <div>
              <Route path={"/employees/:caseId"} exact render={(props)=>{
                //console.log(props);
                return <EmployeesOfCase theCaseId={props.match.params.caseId}/>
              }}/>
            </div>

            <div>
              <Route path={"/employees/add/:caseId"} exact render={(props)=>{
                return <AddEmployee theCaseId={props.match.params.caseId}
                                    employees={this.state.employees}
                                    onAddNewEmployeesToCase={this.addEmployeesToCase}/>
              }}>
              </Route>
            </div>

            <div>
              <Route path={"/allEmployees"} exact>
                <AllEmployees employees={this.state.employees}/>
              </Route>
            </div>

            <div>
              <Route path={"/editEmployee"} exact>
                <EditEmployee loggedInEmployee={this.state.loggedInEmployee}
                              onEditBasicInfo={this.editBasicEmployeeInfo}/>
              </Route>
            </div>

            <div>
              <Route path={"/confirmOldPassword"} exact>
                <ConfirmOldPassword loggedInEmployee={this.state.loggedInEmployee}
                                    onChangeEmployeeCredentials={this.changeEmployeeCredentials}/>
              </Route>
            </div>



          </div>
        </Router>
    )
  }

}

export default withAuth(App);

