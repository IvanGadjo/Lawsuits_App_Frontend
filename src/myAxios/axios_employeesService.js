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
    },


    editBasicEmployeeInfo: (editedEmployee,oldId) =>{

        return axios.put("http://localhost:8080/employees/"+oldId,null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "firstName": editedEmployee.firstName,
                "lastName": editedEmployee.lastName,
                "role": editedEmployee.role
            }
        })
    },

    searchEmployees: (term) =>{
        return axios.get("http://localhost:8080/employees/search/"+term,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    }


};

export default employeeService;