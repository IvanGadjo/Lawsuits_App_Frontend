import React  from "react";
import {Link} from "react-router-dom";


//props: employee


const home = (props) =>{

  return(
      <div>
          <h2>Home screen</h2>


          <div className={"container-fluid"}>
              <div className={"col-4"} id={"yourInfoCard"}>
                  <h4>Your info:</h4>


                  <p><span className={"smallText"}>First name:</span> {props.employee.firstName}</p>
                  <p><span className={"smallText"}>Last name:</span> {props.employee.lastName}</p>
                  <p><span className={"smallText"}>Username:</span> {props.employee.username}</p>
                  <p><span className={"smallText"}>Role:</span> {props.employee.role}</p>

                  <br/><br/>
                  <Link to={"/editEmployee"}>
                      <button className={"btn"} id={"button"}>Edit info</button>
                  </Link>

                  <Link to={"/confirmOldPassword"}>
                    <button className={"btn"} id={"button"}>Edit credentials</button>
                  </Link>
              </div>
              <div className={"col-8"}></div>
          </div>

      </div>
  )
};

export default home;