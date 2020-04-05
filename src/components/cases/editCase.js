import React,{Component} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';


// props: theCase, lawsuitEntities, loggedInEmployee, onEditCase

// fixme: When edditing a case, the createdBy field also changes to the editor. Maybe it should stay as before


// FIXME: So USEEFECT gi loada docs spored id zatoa okej traboti tamu toa, tuka go ima case-ot preloaded vo theCase
// fixme: koga ke stavis form validation naprai useefect da go loada od ponovo theCase i da go zapisuva vo props

class EditCase extends Component {


    constructor() {
        super();
        this.state={
            plaintiff: {
                id: "/"
            },
            sued: {
                id: "/"
            }
        }
    }

    // loads options for dropdowns for plaintiff and sued
    loadLawsuitEntitiesNames = () =>{
        //console.log(this.props)
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


    onFormSubmit = (formData) =>{
        formData.preventDefault();

        const editedCase = {
            caseNumber: formData.target.case_num.value,
            name: formData.target.case_name.value,
            basis: formData.target.case_basis.value,
            value: formData.target.case_val.value,
            phase: formData.target.case_phase.value,
            isExecuted: formData.target.case_executed.checked,
            plaintiffId: this.state.plaintiff.id,
            suedId: this.state.sued.id,
            createdBy: this.props.loggedInEmployee.id,
            proxy: formData.target.case_proxy.value,
        };

        const oldCaseId = this.props.theCase.id;

        this.props.onEditCase(editedCase,oldCaseId);
        this.props.history.push("/cases");
    };

    render() {
        return(
            <div>{console.log(this.props)}
                <form onSubmit={this.onFormSubmit}>
                    <br/><br/>
                    <h4>Edit the {this.props.theCase.name} case</h4>

                    <label htmlFor="case_num">Case number:</label>
                    <div>
                        <input type="text" name={"case_num"} id="case_num_id" defaultValue={this.props.theCase.caseNumber}/>
                    </div>

                    <label htmlFor="case_name">Case name:</label>
                    <div>
                        <input type="text" name={"case_name"} id="case_name_id" defaultValue={this.props.theCase.name}/>
                    </div>

                    <label htmlFor="case_basis">Basis:</label>
                    <div>
                        <textarea name={"case_basis"} id="case_basis_id" defaultValue={this.props.theCase.basis}/>
                    </div>

                    <label htmlFor="case_val">Value of case:</label>
                    <div>
                        <input type="text" name={"case_val"} id="case_val_id" defaultValue={this.props.theCase.value}/>
                    </div>

                    <label htmlFor="case_phase">Phase:</label>
                    <div>
                        <input type="text" name={"case_phase"} id="case_phase_id" defaultValue={this.props.theCase.phase}/>
                    </div>

                    <label htmlFor="case_executed">Is the case executed:</label>
                    <div>
                        <input type="checkbox" name={"case_executed"} id="case_executed_id"/>Executed
                    </div>


                    <label htmlFor="case_plantiff">Plaintiff:</label>
                    <div>
                        <Dropdown options={this.loadLawsuitEntitiesNames()}
                                  onChange={this.onSelectPlaintiff}
                                  value={"plaintiff"}
                                  placeholder={"plaintiffs"}
                                  id={"case_plaintiff"}
                        />
                        <Link to={{
                            pathname: "/lawsuitEntities/add",
                            //redirectPath: "/cases/edit/"+this.props.theCase.id
                            redirectPath: "/cases"
                        }}>
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
                        <Link to={{
                            pathname: "/lawsuitEntities/add",
                            redirectPath: "/cases"
                        }}>
                            <button>Add new sued</button>
                        </Link>
                    </div>
                    <br/>

                    <label htmlFor="case_proxy">Change proxy:</label>
                    <div>
                        <input type="text" name={"case_proxy"} id="case_proxy_id" defaultValue={this.props.theCase.proxy}/>
                    </div>

                    <br/>
                    <div>
                        <button type="submit">Save</button>
                        <Link to={"/cases"}>
                            <button>Cancel</button>
                        </Link>
                        <button type="reset">Reset</button>
                    </div>

                </form>

            </div>
        );
    }

}

export default withRouter(EditCase);