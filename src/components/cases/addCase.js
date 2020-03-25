import React,{Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import EmployeeCheckboxes from "./employeesCheckboxes";
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';


// props: employees, cases, lawsuitEntities, onAddNewCase


class AddCase extends Component {

    constructor() {
        super();
        this.state={
            showProxyInputField: false,
            employeesOfCase: [],
            plaintiff: {
                id: "/"
            },
            sued: {
                id: "/"
            },
            parentCase: {
                id: "/"
            },
            proxy: "/"
        }
    }

    // to be shown if a proxy is needed
    renderProxyInputField = () => {

        if(this.state.showProxyInputField)
           return(
               <div>
                   <form onSubmit={this.saveProxy} noValidate>
                       <label htmlFor="case_proxy">Proxy:</label><br/>
                       <input type="text" name={"case_proxy"} id="case_proxy_val" placeholder=""/>
                       <button type="submit">Save proxy</button>
                   </form>
               </div>
           );
        else
            return <div/>
    };

    showProxyInputField = (e) =>{
        e.preventDefault();
        this.setState({
            showProxyInputField: true
        })
    };


    saveProxy = (pr) =>{
        pr.preventDefault();
        //console.log(pr.target.case_proxy.value)
        this.setState({
            proxy:pr.target.case_proxy.value
        })
    };

    loadParentCasesNames = () =>{
        let menuOptions = [];
        menuOptions.push("NONE");
        this.props.cases.filter((c)=>{
            return c.parentCase == null;
        }).forEach(c =>{
            menuOptions.push(c.name)
        });

        return menuOptions;
    };

    // callback for employeesCheckboxes component, adds emp ids to state
    selectedEmployeesChange = (selectedEmployees) =>{
        this.setState({
            employeesOfCase: selectedEmployees
        })
    };

    // loads options for dropdowns for plaintiff and sued
    loadLawsuitEntitiesNames = () =>{
        let menuOptions = [];
        this.props.lawsuitEntities.forEach(le =>{
            menuOptions.push(le.name)
        });
        // console.log(menuOptions);
        return menuOptions;
    };



    onSelectPlaintiff = (e) =>{
        let plaintiffName = e.value;
        //console.log(plaintiffName)

        let plaintiffs = this.props.lawsuitEntities.filter(le =>{
            return le.name === plaintiffName
        });

        //console.log(plaintiffs[0]);

        //console.log(e)
        this.setState({
            plaintiff: plaintiffs[0]
        })
    };
    onSelectSued = (e) =>{
        let suedName = e.value;

        let sueds = this.props.lawsuitEntities.filter(le =>{
            return le.name === suedName
        });

        //console.log(sueds[0]);

        //console.log(e)
        this.setState({
            sued: sueds[0]
        })
    };
    onSelectParentCase = (e) =>{
        let caseName = e.value;

        if (caseName !== "NONE") {

            let parentCases = this.props.cases.filter(c => {
                return c.name === caseName
            });

            this.setState({
                parentCase: parentCases[0]
            })
        }
    };


    onFormSubmit = (formData) =>{
      formData.preventDefault();

      const newCase = {
            caseNumber: formData.target.case_num.value,
            name: formData.target.case_name.value,
            basis: formData.target.case_basis.value,
            value: formData.target.case_val.value,
            phase: formData.target.case_phase.value,
            isExecuted: false,
            parentCaseId: this.state.parentCase.id,
            plaintiffId: this.state.plaintiff.id,
            suedId: this.state.sued.id,
            createdBy: this.props.loggedInEmployee.id,
            proxy: this.state.proxy,

            employeesToAdd: this.state.employeesOfCase        // this goes in a separate axios request
      };

        //console.log(newCase)

        this.props.onAddNewCase(newCase);

        this.props.history.push("/cases")
    };


    render() {
        return(
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <br/><br/>
                    <h4>Add new case</h4>

                    <label htmlFor="case_num">Case number:</label>
                    <div>
                        <input type="text" name={"case_num"} id="case_num_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_name">Case name:</label>
                    <div>
                        <input type="text" name={"case_name"} id="case_name_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_createdAt">Input date:</label>
                    <div>
                        <input type="date" name={"case_createdAt"} id="case_num_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_basis">Basis:</label>
                    <div>
                        <textarea name={"case_basis"} id="case_basis_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_val">Value of case:</label>
                    <div>
                        <input type="text" name={"case_val"} id="case_val_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_phase">Phase:</label>
                    <div>
                        <input type="text" name={"case_phase"} id="case_phase_id" placeholder=""/>
                    </div>

                    <br/><br/>
                    <label htmlFor="case_parentCase">Parent case:</label>
                    <div>
                        <Dropdown options={this.loadParentCasesNames()}
                                  onChange={this.onSelectParentCase}
                                  value={"parentCase"}
                                  placeholder={"parent case"}
                                  id={"parent_case_id"}
                        />

                    </div>


                    <br/><br/>
                    <h4>Select employees for the case:</h4>
                    <EmployeeCheckboxes allEmployees={this.props.employees} onSelectedEmployeesChange={this.selectedEmployeesChange}/>
                    <br/><br/>



                    <label htmlFor="case_plantiff">Plaintiff:</label>
                    <div>
                        <Dropdown options={this.loadLawsuitEntitiesNames()}
                                  onChange={this.onSelectPlaintiff}
                                  value={"plaintiff"}
                                  placeholder={"plaintiffs"}
                                  id={"case_plaintiff"}
                        />
                        <Link to={"/lawsuitEntities/add"}>
                            <button>Add new plaintiff</button><br/>
                        </Link>
                    </div>



                    <label htmlFor="case_sued">Sued:</label>
                    <div>
                        <Dropdown options={this.loadLawsuitEntitiesNames()}
                                  onChange={this.onSelectSued}
                                  value={"sued"}
                                  placeholder={""}
                                  id={"case_sued"}
                        />
                        <Link to={"/lawsuitEntities/add"}>
                            <button>Add new sued</button>
                        </Link>
                    </div>
                    <br/>

                    {/*<div>*/}
                    {/*    <button onClick={this.showProxyInputField}>Add a proxy</button>*/}
                    {/*    {this.renderProxyInputField()}*/}
                    {/*</div>*/}

                    <div>
                        <button type="submit">Save</button>
                        <Link to={"/cases"}>
                            <button>Cancel</button>
                        </Link>
                        <button type="reset">Reset</button>
                    </div>

                </form>

                <br/><br/>
                <div>
                    <button onClick={this.showProxyInputField}>Add a proxy</button>
                    {this.renderProxyInputField()}
                </div>
            </div>
        )
    }
}

export default withRouter(AddCase);