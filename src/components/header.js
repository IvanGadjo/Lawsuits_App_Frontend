import React from "react";
import {Link} from "react-router-dom";


const header = (props) =>{

    return(
        <div>
            <h2 className={"container-fluid p-3 my-3 bg-dark text-white"}>The lawsuits app of Posta</h2>
            <ul className={"nav nav-tabs"}>
                <li className={"nav-item"}><Link to={"/home"} activeclassname={"nav-link active"}>Home</Link></li>
                <li className={"nav-item"}><Link to={"/cases"} activeclassname={"nav-link"}>Cases</Link></li>
            </ul>
        </div>
    )
};

export default header;