import React,{useState,useEffect} from 'react';
import axios from 'axios'


const BasicEmployeeCaseInfo = (props) =>{

    const [employeeCases, setEmployeeCases] = useState({
       cases:[]
    });


    useEffect(()=>{

        console.log(props.employeeId);

        axios({
            method: "get",
            url: "http://localhost:8080/cases/byEmployeeId/"+props.employeeId,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
        }).then(resp =>{
            setEmployeeCases(resp.data);
            console.log(props.employeeId,resp.data)
            
        })
    },[props.employeeId]);


    function casesRendering() {
        if(typeof employeeCases == "undefined")
            return <td>Nisto - undefined</td>
        else
            return <td>{employeeCases.cases}</td>
    }

    return(
        <tr>
            <td>{props.employeeFirstName}</td>
            <td>{props.employeeLastName}</td>
            <td>{props.employeeId}</td>

            {console.log(employeeCases.cases)}

            {casesRendering()}
            {/*{employeeCases.cases.map((c,index) =>*/}
            {/*    <td key={index}>{c}</td>*/}
            {/*)}*/}
        </tr>
    )
};

export default BasicEmployeeCaseInfo;