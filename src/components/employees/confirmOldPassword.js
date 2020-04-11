import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import EditCredentials from "./editCredentials";


// props: loggedInEmployee, onChangeEmployeeCredentials

const ConfirmOldPassword = (props) =>{

    const [showEditCredentials,setShowEditCredentials]=useState(false);

    const onFormSubmit = (formData) =>{
        formData.preventDefault();

        axios.post("http://localhost:8080/confirmPassword",null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "username": props.loggedInEmployee.username,
                "password": formData.target.old_pass.value
            }
        }).then(resp=>{
            //console.log(resp.data);

            if (resp.data === true)
                setShowEditCredentials(true);
            else setShowEditCredentials(false);
        })


    };


    const renderEditCredentials = () =>{
        if (showEditCredentials === true) {
            return(
                <div>
                    <EditCredentials loggedInEmployee={props.loggedInEmployee}
                                     onChangeEmployeeCredentials={props.onChangeEmployeeCredentials}   />
                </div>
            )
        }
        else{
            return <div/>
        }
    };

    return(
        <div>
            <form onSubmit={onFormSubmit} noValidate>
                <br/><br/>
                <label htmlFor={"old_pass"} className={"smallText"}>Confirm old password:</label><br/>
                <input type={"password"} name={"old_pass"}/>

                <button type={"submit"} className={"btn"} id={"button"}>Submit</button>
                <button type={"reset"} className={"btn"} id={"button"}>Reset</button>

                <Link to={"/home"}>
                    <button className={"btn"} id={"button"}>Cancel</button>
                </Link>

                <br/><br/><br/>
            </form>

            {renderEditCredentials()}
        </div>
    )
};

export default ConfirmOldPassword;