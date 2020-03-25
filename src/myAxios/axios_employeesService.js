//import axios from './axios-config'
import axios from 'axios'

const employeeService = {

    loadEmployees: () =>{

        return axios({
            method: "get",
            url: "http://localhost:8080/employees",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
        })
    }


};

export default employeeService;