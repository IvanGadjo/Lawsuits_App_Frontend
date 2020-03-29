import React from "react";
import {Link} from "react-router-dom";
import AuthService from "./AuthService";


class LogIn extends React.Component{


    constructor() {
        super();
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);   // mora da mu napravis bind za da mozes da koristis this vo metodot
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        //debugger;
        if (this.Auth.loggedIn()){
            console.log(window.location.pathname);
            this.props.history.replace('/home');        // ako userot e vekje logiran togas odi na App component
        }
    }

    handleChange(e){                // stava vo state username i password
        //console.log(e.target.name,e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleFormSubmit(e){
        e.preventDefault();

        //debugger;
        //console.log(this.state.username,this.state.password)

        this.Auth.login(this.state.username, this.state.password)   // ako userot e logiran go nosi na App component
            .then(res => {
                this.props.history.replace('/home');
            })
            .catch(err =>{
                alert(err)
            })
    }



    render() {

        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h4>Login</h4>
                    <label htmlFor={'username'}>Username:</label>
                    <div>
                        <input type='text' name={'username'} onChange={this.handleChange}/>
                    </div>
                    <label htmlFor={'password'}>Password:</label>
                    <div>
                        <input type='text' name={'password'} onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type='submit' className={'form-submit'} value={'submit'} />
                    </div>


                </form>

                <br/><br/>
                <Link to={'/register'}>
                    <button>Register new user</button>
                </Link>
            </div>
        )
    }

}

export default LogIn;