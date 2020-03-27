import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthService from "../authentication/AuthService";
import {withRouter} from 'react-router-dom';



// props loggedInEmployee, onChangeEmployeeCredentials

// fixme: frkata e pri stavanje na nov username, se povikuva loadAllEmpsFromDB, na ovoj request se desava doFilterInternal
//  od filterot na spring. Tuka pagja bidejki vo filterot go zema username od requestot i usernameto e staroto, pa
//  ne se sovpagja so novoto i se desava exception
//  => frkata e sto go zema username od tokenot, a tokenot e so stariot username bidejki e generiran pri log in
//  => 1. resenie - naprai nov request kon login apito za da generiras nov token (NE MOZE - dozvoleno e samo eden req kon /login)
//  => 2. resenie - naprai (na backend) requestot za changeCredentials da ti vrakja nov token



class EditCredentials extends Component{

    constructor(props) {
        super();

        this.Auth = new AuthService();
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }


    onFormSubmit = (formData) =>{
        formData.preventDefault();

        const username = formData.target.emp_username.value;
        const password = formData.target.emp_password.value;

        // prvin ova no bez load new emps
        this.props.onChangeEmployeeCredentials(this.props.loggedInEmployee.id,username,password);

        this.props.history.push("/home")
    };


    render() {
        return(
            <div>
                <h3>Set new username and password</h3>
                <form onSubmit={this.onFormSubmit}>

                    <label htmlFor={"emp_username"}>New username:</label><br/>
                    <input type={"text"} defaultValue={this.props.loggedInEmployee.username}
                           name={"emp_username"}/><br/>

                    <label htmlFor={"emp_password"}>New password:</label><br/>
                    <input type={"text"} name={"emp_password"}/><br/><br/>

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

export default withRouter(EditCredentials);