import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';


//props: childCase, colapseCallback, onDeleteCase


const ChildCaseDetails = (props) =>{


    const [childCasePlaintiff, setChildCasePlaintiff] = useState({});

    const [childCaseSued, setChildCaseSued] = useState({});

    useEffect(() =>{

        axios({
            method: "get",
            url: "http://localhost:8080/cases/getPlaintiff/"+props.childCase.id,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{

            setChildCasePlaintiff(resp.data)
        });

        axios({
            method: "get",
            url: "http://localhost:8080/cases/getSued/"+props.childCase.id,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{

            setChildCaseSued(resp.data)

        });

    },[props.childCase.id]);



    const renderPlaintiff = () =>{
        if (childCasePlaintiff === undefined)
            return <td/>;
        else
            return <td>{childCasePlaintiff.name}</td>
    };

    const renderSued = () =>{
        if (childCaseSued === undefined)
            return <td/>;
        else
            return <td>{childCaseSued.name}</td>;
    };




    const renderChildCase = () =>{

        return(
            <tr bgcolor="#f7da63">
                <td>{props.childCase.caseNumber}</td>
                <td>{props.childCase.name}</td>
                <td>{props.childCase.createdAt}</td>
                <td>{props.childCase.basis}</td>
                <td>{props.childCase.value}</td>
                <td>{props.childCase.executed.toString()}</td>
                <td>{props.childCase.proxy}</td>

                {renderPlaintiff()}
                {renderSued()}

                <td>

                    <Link to={{
                        pathname: "/employees/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button>All Employees</button>
                    </Link>

                    <Link to={{
                        pathname: "/employees/add/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button>Add new employee</button>
                    </Link>
                </td>
                <td>
                    <Link to={{
                        pathname: "/documents/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button>All documents</button>
                    </Link>

                    <Link to={{
                        pathname: "/documents/add"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button>Add document</button>
                    </Link>
                </td>
                <td>{props.childCase.phase}</td>

                <td>
                    <Link to={{
                        pathname: "/cases/edit/"+props.childCase.id,
                        theCase: props.childCase
                    }}>
                        <button>Edit</button>
                    </Link>

                    <button onClick={() => {
                        props.onDeleteCase(props.childCase.id);
                        props.colapseCallback()
                    }}>Delete</button>

                    <button onClick={props.colapseCallback}>Colapse</button>
                </td>

            </tr>
        )
    };


    //console.log(props.childCase.name,"---",childCasePlaintiff.name)


    return(
        renderChildCase()
    )
};


export default ChildCaseDetails;