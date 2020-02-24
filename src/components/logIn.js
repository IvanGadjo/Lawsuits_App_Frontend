import React from "react";
import {Link} from "react-router-dom";


class LogIn extends React.Component{


    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);   // mora da mu napravis bind za da mozes da koristis this vo metodot
    }

    handleChange(e){                // stava vo state username i password
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    render() {

        return(
            <div>
                <form>
                    <h4>Login</h4>
                    <label htmlFor={'username_of_user'}>Username:</label>
                    <div>
                        <input type='text' name={'username_of_user'} onChange={this.handleChange}/>
                    </div>
                    <label htmlFor={'user_password'}>Password:</label>
                    <div>
                        <input type='text' name={'password_of_user'} onChange={this.handleChange}/>
                    </div>


                    <div>
                        <Link to={'/home'}>
                            <button type='submit'>Log in</button>
                        </Link>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default LogIn;