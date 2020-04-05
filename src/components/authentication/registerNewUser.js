import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from 'axios'
import { useForm } from 'react-hook-form'


const RegisterNewUser = (props) =>{


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption,setSelectedOption] = useState("option1");
    const [username,setUsername] = useState("");
    const [password,setPass] = useState("");

    // for radio buttons
    const handleOptionChange = (e) =>{
        setSelectedOption(e.target.value);
    };

    // for username and pass
    const handleChange = (e) =>{                // stava vo state username i password
        if (e.target.name == "username"){
            setUsername(e.target.value);
        }
        else {
            setPass(e.target.value);
        }
    };


    const handleFormSubmit = (e) =>{
        //e.preventDefault();

        let role = '';
        if (selectedOption === "option1")
            role = 'supervisor';
        else
            role = 'lawyer';


        axios.post("http://localhost:8080/register",null,{
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            params:{
                "firstName": e.firstName,
                "lastName": e.lastName,
                "username": username,
                "password": password,
                "role": role
            }
        }).then(
            props.history.push('/login')
        )
    };


        return(
            <div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h4>Register new user</h4>

                    <label htmlFor={'firstName'}>First name:</label>
                    <div>
                        <input type='text' name={'firstName'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.firstName && <p>First name is required!</p>}
                    </div>

                    <label htmlFor={'lastName'}>Last name:</label>
                    <div>
                        <input type='text' name={'lastName'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.lastName && <p>Last name is required!</p>}
                    </div>


                    <label htmlFor={'username'}>Username:</label>
                    <div>
                        <input type='text' name={'username'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.username && <p>A username is required!</p>}
                    </div>

                    <label htmlFor={'password'}>Password:</label>
                    <div>
                        <input type='text' name={'password'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.password && <p>Password is required!</p>}
                    </div>


                    <label>Are you a supervisor/lawyer?</label>
                    <br/>

                    <input type={"radio"}
                           id={"type_supervisor"}
                           name={"type"}
                           value={"option1"}
                           checked={selectedOption === "option1"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_supervisor"}>Supervisor</label>

                    <input type={"radio"}
                           id={"type_lawyer"}
                           name={"type"}
                           value={"option2"}
                           checked={selectedOption === "option2"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_lawyer"}>Lawyer</label>

                    <div>
                        <input type='submit' className={'form-submit'} value={'submit'} />

                        <button type={"reset"}>Reset</button>

                        <Link to={"/login"}>
                            <button>Cancel</button>
                        </Link>
                    </div>


                </form>
            </div>
        )


};

export default withRouter(RegisterNewUser);