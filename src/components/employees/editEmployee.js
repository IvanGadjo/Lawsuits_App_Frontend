import React,{Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

// props: loggedInEmployee, onEditBasicInfo

class EditEmployee extends Component{

    onFormSubmit = (formData) =>{
        formData.preventDefault();

        const editedEmp = {
            "firstName": formData.target.emp_firstName.value,
            "lastName": formData.target.emp_lastName.value,
            "role": this.props.loggedInEmployee.role
        };

        //console.log(editedEmp);

        this.props.onEditBasicInfo(editedEmp,this.props.loggedInEmployee.id);

        this.props.history.push("/home");
    };

    render() {
        return(
            <div>
                <h4>Edit your info:</h4>
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor={"emp_firstName"}>New first name:</label><br/>
                    <input type={"text"} name={"emp_firstName"} defaultValue={this.props.loggedInEmployee.firstName}/><br/><br/>

                    <label htmlFor={"emp_lastName"}>New last name:</label><br/>
                    <input type={"text"} name={"emp_lastName"} defaultValue={this.props.loggedInEmployee.lastName}/><br/><br/>

                    <button type={"submit"}>Submit</button>
                    <button type={"reset"}>Reset</button>
                    <Link to={"/home"}>
                        <button>Cancel</button>
                    </Link>
                </form>
            </div>
        )
    }

}

export default withRouter(EditEmployee);
