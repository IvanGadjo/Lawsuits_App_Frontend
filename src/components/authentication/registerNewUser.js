import React,{Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from 'axios'


class RegisterNewUser extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "option1"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // for radio buttons
    handleOptionChange = (e) =>{
        this.setState({
            selectedOption: e.target.value
        });
    };

    // for username and pass
    handleChange(e){                // stava vo state username i password
        // console.log(e.target.name,e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        });
    }


    handleFormSubmit(e){
        e.preventDefault();

        console.log(this.state)
        let role = '';
        if (this.state.selectedOption === "option1")
            role = 'supervisor';
        else
            role = 'lawyer';


        axios.post("http://localhost:8080/register",null,{
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            params:{
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "username": this.state.username,
                "password": this.state.password,
                "role": role
            }
        }).then(
            this.props.history.push('/login')
        )
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h4>Register new user</h4>

                    <label htmlFor={'firstName'}>First name:</label>
                    <div>
                        <input type='text' name={'firstName'} onChange={this.handleChange}/>
                    </div>

                    <label htmlFor={'lastName'}>Last name:</label>
                    <div>
                        <input type='text' name={'lastName'} onChange={this.handleChange}/>
                    </div>


                    <label htmlFor={'username'}>Username:</label>
                    <div>
                        <input type='text' name={'username'} onChange={this.handleChange}/>
                    </div>

                    <label htmlFor={'password'}>Password:</label>
                    <div>
                        <input type='text' name={'password'} onChange={this.handleChange}/>
                    </div>


                    <label>Are you a supervisor/lawyer?</label>
                    <br/>

                    <input type={"radio"}
                           id={"type_supervisor"}
                           name={"type"}
                           value={"option1"}
                           checked={this.state.selectedOption === "option1"}
                           onChange={this.handleOptionChange}
                    />
                    <label htmlFor={"type_supervisor"}>Supervisor</label>

                    <input type={"radio"}
                           id={"type_lawyer"}
                           name={"type"}
                           value={"option2"}
                           checked={this.state.selectedOption === "option2"}
                           onChange={this.handleOptionChange}
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
    }

}

export default withRouter(RegisterNewUser);