import React,{useState,useEffect} from "react";
import axios from 'axios'
import BasicEmployeeCaseInfo from "./basicEmployeeCaseInfo";


const AllEmployees = (props) =>{


    return(
        <div>
            <table id='cases-table'>
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