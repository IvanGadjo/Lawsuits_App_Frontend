import React,{useState,useEffect} from 'react';
import axios from 'axios'


// props: theCaseId

const Employees = (props) =>{

    const [employeesOfCase, setEmployees] = useState({
       emps:[
           {   firstName: "TMP",
               lastName: "TMP lastName",
               username: "TMP usrtmp",
               password: "TMP usrtmppass",
               role: "TMP noRole",
               cases: [],
               createdCases: [],
               documents: [],
               id: 100
           },
           {
               firstName: "KRC",
               lastName: "KRC lastName",
               username: "KRC usrtmp",
               password: "KRC usrtmppass",
               role: "KRC noRole",
               cases: [],
               createdCases: [],
               documents: [],
               id: 101
           }
       ]
    });

    useEffect(()=>{

        axios({
            method:"get",
            url: "http://localhost:8080/employees/ofCase/"+props.theCaseId,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then((resp)=>{
            //console.log(resp.data)              // ova treba da se procitanite

            let empArray = [];

            let i = 0;
            resp.data.forEach((item)=>{
                empArray[i++]=item;
            });

            //console.log(empArray);

            setEmployees({
                emps: empArray
            })

            //console.log(employeesOfCase)        // ova treba da bide default vrednosti
        })

    },[]);





    //console.log(employeesOfCase);   // ednas gi dava defaultnite, ednas gi dava procitanite

    return (
        <div>

                {employeesOfCase.emps.map((e,kluc) =>
                    <ul key={kluc}>
                        <li>
                            <ul >
                                <h6>{e.firstName} {e.lastName}</h6>
                                <p>{e.role}</p>
                            </ul>
                        </li>
                    </ul>
                )}


        </div>
    )
};

export default Employees;