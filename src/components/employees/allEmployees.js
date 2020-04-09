import React from "react";
import BasicEmployeeCaseInfo from "./basicEmployeeCaseInfo";
import FormSearch from "../FormSearch";


// props: employees, onSearch, onClickReset

const AllEmployees = (props) =>{


    return(
        <div>

            <FormSearch onSearch={props.onSearch}
                        onClickReset={props.onClickReset}
                        className="form-control"/>
            <br/>



            <table id='cases-table' className={"table table-hover"}>
                <thead className={"thead-light"}>
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