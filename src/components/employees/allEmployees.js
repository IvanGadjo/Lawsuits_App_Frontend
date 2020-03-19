import React from "react";
import BasicEmployeeCaseInfo from "./basicEmployeeCaseInfo";


const AllEmployees = (props) =>{


    return(
        <div>
            <table id='cases-table'>
                <thead>
                    <tr>
                        <th>First name:</th>
                        <th>Last name:</th>
                        <th>(Employee id:)</th>
                        <th>Working on:</th>
                    </tr>
                </thead>
                <tbody>
                    {props.employees.map((e,index) =>
                        <BasicEmployeeCaseInfo employeeFirstName={e.firstName}
                                               employeeLastName={e.lastName}
                                               employeeId={e.id}
                                               key={index}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default AllEmployees;