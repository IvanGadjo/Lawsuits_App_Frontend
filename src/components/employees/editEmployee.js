import React,{Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import { useForm } from 'react-hook-form'

// props: loggedInEmployee, onEditBasicInfo

const EditEmployee = (props) =>{


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const onFormSubmit = (formData) =>{
        //formData.preventDefault();

        const editedEmp = {
            "firstName": formData.emp_firstName,
            "lastName": formData.emp_lastName,
            "role": props.loggedInEmployee.role
        };

        console.log(editedEmp);

        props.onEditBasicInfo(editedEmp,props.loggedInEmployee.id);

        props.history.push("/home");
    };

    //render() {
        return(
            <div>
                <h4>Edit your info:</h4>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor={"emp_firstName"}>New first name:</label><br/>
                    <input type={"text"} name={"emp_firstName"} defaultValue={props.loggedInEmployee.firstName}
                           ref={register({
                               required: true
                           })}/><br/><br/>
                    {errors.emp_firstName && <p>First name is required!</p>}

                    <label htmlFor={"emp_lastName"}>New last name:</label><br/>
                    <input type={"text"} name={"emp_lastName"} defaultValue={props.loggedInEmployee.lastName}
                           ref={register({
                               required: true
                           })}/><br/><br/>
                    {errors.emp_lastName && <p>Last name is required!</p>}

                    <button type={"submit"}>Submit</button>
                    <button type={"reset"}>Reset</button>
                    <Link to={"/home"}>
                        <button>Cancel</button>
                    </Link>
                </form>
            </div>
        )
    //}

};

export default withRouter(EditEmployee);
