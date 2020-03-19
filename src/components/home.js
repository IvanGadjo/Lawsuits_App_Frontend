import React  from "react";



const home = (props) =>{

  return(
      <div>
          <h1>Home screen</h1>

          <h3>Your info:</h3>
          <p>First name: {props.employee.firstName}</p>
          <p>Last name: {props.employee.lastName}</p>
          <p>Username: {props.employee.username}</p>
          <p>Role: {props.employee.role}</p>


      </div>
  )
};

export default home;