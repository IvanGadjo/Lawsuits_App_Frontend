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
import TransferDocument from "./components/documents/transferDocument";

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
      //console.log(resp.data)
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
  // Lawsuit Entities
  addNewLawsuitEntityToDB = (newLawsuitEntity) =>{
    lawsuitEntitiesService.addNewLawsuitEntity(newLawsuitEntity).then(resp =>{

      this.setState({
        lawsuitEntities: [...this.state.lawsuitEntities,resp.data]
      });
    })
  };
  editLawsuitEntity = (editedLawsuitEntity, oldId) =>{
    lawsuitEntitiesService.editLawsuitEntity(editedLawsuitEntity, oldId).then(resp =>{

      setTimeout(()=>{this.loadAllLawsuitEntitiesFromDB()},500);  // time needed to execute queries in db

      //this.loadAllLawsuitEntitiesFromDB();
    })
  };
  deleteLawsuitEntity = (id) =>{
    this.setState((prevState)=>{
      const startIdx = prevState.lawsuitEntities.findIndex(le => le.id === id);
      prevState.lawsuitEntities.splice(startIdx,1);
      const newLE = prevState.lawsuitEntities;

      return{
        lawsuitEntities: newLE
      }
    })
  };
  searchLawsuitEntities = (term) =>{
    lawsuitEntitiesService.searchLawsuitEntities(term).then(resp =>{
      //console.log(resp.data)
      this.setState({
        lawsuitEntities: resp.data
      })
    })
  };

  // Cases
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
  removeEmployeesFromCase = (employeesToRemove, caseId) =>{
    casesService.removeEmployeesFromCase(employeesToRemove, caseId).then(r =>{
      this.loadAllCasesFromDB();
    });
  };
  editCase = (editedCase, oldId) =>{
    casesService.editCase(editedCase,oldId).then(resp =>{

      setTimeout(()=>{this.loadAllCasesFromDB()},500);  // time needed to execute queries in db

      //this.loadAllCasesFromDB();
    })
  };
  deleteCase = (caseId) =>{
    casesService.deleteCase(caseId).then(resp =>{
      this.setState((prevState)=>{

        const startIndex = prevState.cases.findIndex(c =>
          c.id === caseId
        );
        prevState.cases.splice(startIndex,1);
        const newCases = prevState.cases;

        return{
          cases: newCases
        }
      })
    })
  };
  moveDocsBetweenCases = (docs, newCaseId, oldCaseId) =>{
    casesService.moveDocsBetweenCases(docs,newCaseId).then( resp=>{
      this.loadAllCasesFromDB();
    })
  };
  searchCases = (term) =>{
    casesService.searchCase(term).then(resp =>{
      //console.log(resp.data);

      this.setState({
        cases: resp.data
      })
    })

  };


  // Docs
  editDocument = (editedDoc, oldId) =>{
    documentsService.editDoc(editedDoc,oldId).then(resp =>{
      setTimeout(()=>{this.loadAllCasesFromDB()},500);  // time needed to execute queries in db
      //this.loadAllCasesFromDB();
    })
  };
  deleteDocument = (id) =>{
    documentsService.deleteDoc(id);
  };
  uploadDocument = (formData, otherParams) =>{
    documentsService.uploadDoc(formData, otherParams).then(resp =>{
      this.loadAllCasesFromDB();
    })
  };

  // Emps
  editBasicEmployeeInfo = (editedEmployee, oldId)=>{
    employeeService.editBasicEmployeeInfo(editedEmployee,oldId).then(resp =>{
      setTimeout(()=>{this.loadAllEmployeesFromDB()},500);  // time needed to execute queries in db
      //this.loadAllEmployeesFromDB();
    })
  };
    // functionality implemented with hook
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
  searchEmployees = (term) =>{
    employeeService.searchEmployees(term).then(resp =>{
      //console.log(resp.data)
      this.setState({
        employees: resp.data
      })
    })
  };






  render() {
    return(
        <Router>


          {/* todo: App logo, name and header*/}

          <div className={"container-fluid"}>


            <div className={"row"}>

              <div className={"col-10"}>
                <img src={require('./resources/logo_transparent.png')} id={"imgLogo"}/>
                <h2 id={"masterTitle"}>Wawsuit - The Lawsuits App</h2>
              </div>

              <div className={"col-2"}>
                <span className={"badge badge-secondary"}>{this.state.loggedInEmployee.role}</span><br/>

                <button type="button" className="form-submit" id={"logoutButton"}
                        className={"btn"} id={"button"}
                        onClick={this.handleLogout.bind(this)}>Logout</button>
                <br/><br/>
              </div>
            </div>


            <div className={" btn-group"} id={"navbarButtons"}>

              <button className={"nav-item"}><Link to={"/home"}>Home</Link></button>&nbsp;
              <button className={"nav-item"}><Link to={"/cases"}>Cases</Link></button>&nbsp;
              <button className={"nav-item"}><Link to={"/allEmployees"} >All Employees</Link></button>&nbsp;
              <button className={"nav-item"}><Link to={"/allLawsuitEntities"} >All lawsuit entities</Link></button>&nbsp;

            </div>
          </div>
          <br/>






          {/* todo: Different paths of the app*/}

          <div className={"container-fluid"} id={"masterPage"}>
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
                <Cases cases={this.state.cases}
                        onDeleteCase={this.deleteCase}
                        onSearch={this.searchCases}
                        onClickReset={this.loadAllCasesFromDB}/>
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
                <AllLawsuitEntities lawsuitEntities={this.state.lawsuitEntities}
                                    onDeleteLawsuitEntity={this.deleteLawsuitEntity}
                                    onSearch={this.searchLawsuitEntities}
                                    onClickReset={this.loadAllLawsuitEntitiesFromDB}/>

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
                return <Documents theCaseId={props.match.params.caseId}
                                  onDelete={this.deleteDocument}/>
              }}/>
            </div>

            <div>
              <Route path={"/documents/add/:caseId"} exact render={(props)=>{
                return <AddDocument theCaseId={props.match.params.caseId}
                                    allCases={this.state.cases}
                                    courts={this.state.courts}
                                    loggedInEmployee={this.state.loggedInEmployee}
                                    onUploadDoc={this.uploadDocument}/>
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
              }}/>
            </div>

            <div>
              <Route path={"/documents/transfer/:docId"} exact render={(props)=>{
                return <TransferDocument theDocumentInfo={props.location.theDocumentInfo}
                                          thisCaseId={props.location.thisCaseId}
                                          cases={this.state.cases}
                                          onMoveDoc={this.moveDocsBetweenCases}/>
              }}/>
            </div>




            {/*EMPLOYEES*/}
            <div>
              <Route path={"/employees/:caseId"} exact render={(props)=>{
                //console.log(props);
                return <EmployeesOfCase theCaseId={props.match.params.caseId}
                                        onRemoveEmployee={this.removeEmployeesFromCase}/>
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
                <AllEmployees employees={this.state.employees}
                              onSearch={this.searchEmployees}
                              onClickReset={this.loadAllEmployeesFromDB}/>
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

