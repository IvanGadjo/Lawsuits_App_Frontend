import React from "react";
import {Link} from "react-router-dom";


const login = (props) =>{

    return(
        <div>
            <form>
                <h4>Login</h4>
                <label htmlFor={'username_of_user'}>Username:</label>
                <div>
                    <input type='text' name={'username_of_user'}/>
                </div>
                <label htmlFor={'user_password'}>Password:</label>
                <div>
                    <input type='text' name={'user_password'}/>
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

};

export default login;