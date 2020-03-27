import React from "react";
import axios from 'axios'


const credentialsService = {

    confirmPass: (username, password) =>{
        return axios.post("http://localhost:8080/confirmPassword",null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "username": username,
                "password": password
            }
        })
    },

    changeCredentialsOfEmployee: (employeeId,username,password) =>{

        return axios.put("http://localhost:8080/changeCredentials/"+employeeId,null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "username": username,
                "password": password
            }
        })
    }

};

export default credentialsService;