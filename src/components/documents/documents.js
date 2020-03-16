import React,{useState,useEffect} from "react";
import axios from 'axios'
import {Link} from "react-router-dom";



const Documents = (props) =>{

    const [docsInfo,setDocs] = useState({
        docs:[
            {
                id: 0,
                name: "TMP doc",
                archiveNumber: 0,
                input: true,
                documentDate: "TMP Date",
                fileType: "TMP FileType",
                employeeCreatorName: "TMP Creator",
                downloadUrl: "-no download url-"
            }
        ]
    });

    useEffect(()=>{
        axios({
            method:"get",
            url: "http://localhost:8080/documents/ofCase/"+ props.theCaseId,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{
            setDocs({
                docs:resp.data
            })
        })
    },[]);


    const downloadDocument = (e) =>{

        console.log("e target val:",e.target.value)

        axios({
            method: "get",
            url: e.target.value,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{

            console.log(resp.data.blob())

            // resp.data.blob().then(blob => {
            //     let url = window.URL.createObjectURL(blob);
            //     let a = document.createElement('a');
            //     a.href = url;
            //     a.download = 'employees.json';
            //     a.click();
            // })
        })
    };

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>(Doc id)</th>
                        <th>name:</th>
                        <th>archive number:</th>
                        <th>is input:</th>
                        <th>date created:</th>
                        <th>file type:</th>
                        <th>created by:</th>
                        <th>actions:</th>
                    </tr>
                </thead>
                <tbody>
                    {docsInfo.docs.map((di,kluc)=>
                        <tr key={kluc}>
                            <td>{di.id}</td>
                            <td>{di.name}</td>
                            <td>{di.archiveNumber}</td>
                            <td>{di.input.toString()}</td>
                            <td>{di.documentDate}</td>
                            <td>{di.fileType}</td>
                            <td>{di.employeeCreatorName}</td>
                            {/*<td>{di.downloadUrl}</td>*/}
                            <td>
                                <button onClick={downloadDocument} value={di.downloadUrl}>Download document</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};


export default Documents;