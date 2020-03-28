import React from "react";
import axios from 'axios';


const documentsService = {


    editDoc: (editedDoc, oldId) =>{
        return axios.put("http://localhost:8080/documents/"+oldId,null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "archiveNumber": editedDoc.archiveNumber,
                "isInput": editedDoc.isInput,
                "documentDate": editedDoc.documentDate,
                "employeeId": editedDoc.employeeId,
                "courtId": editedDoc.courtId,
                "caseId": editedDoc.caseId
            }
        })
    },

    deleteDoc: (id) =>{
        return axios.delete("http://localhost:8080/documents/"+id,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    }
};


export default documentsService;