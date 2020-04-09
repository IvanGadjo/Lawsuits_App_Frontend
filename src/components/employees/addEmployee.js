import React,{Component} from "react";
import EmployeeCheckboxes from "./employeesCheckboxes";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';

// props: theCaseId, employees, addEmployeesToCase()

class AddEmployee extends Component {


    constructor() {
        super();

        this.state={
            employeesToBeAdded: []
        }
    }


    // callback for employeesCheckboxes component, adds emp ids to state
    selectedEmployeesChange = (selectedEmployees) =>{
        this.setState({
            employeesToBeAdded: selectedEmployees
        })
    };

    onFormSubmit = (e) =>{
        e.preventDefault();

        //console.log(this.state.employeesToBeAdded);

        this.props.onAddNewEmployeesToCase(this.state.employeesToBeAdded,this.props.theCaseId);

        this.props.history.push("/cases")
    };


    render() {
        return(
          <div>
              <form onSubmit={this.onFormSubmit} noValidate>

                  <EmployeeCheckboxes allEmployees={this.props.employees}
                                      onSelectedEmployeesChange={this.selectedEmployeesChange}/>
                  <br/><br/>


                  <div>
                      <button type="submit" className={"btn"} id={"button"}>Save</button>
                      <Link to={"/cases"}>
                          <button className={"btn"} id={"button"}>Cancel</button>
                      </Link>
                      <button type="reset" className={"btn"} id={"button"}>Reset</button>
                  </div>
              </form>
          </div>
        );
    }

}

export default withRouter(AddEmployee);