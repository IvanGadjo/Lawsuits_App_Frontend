import axios from 'axios'
import qs from 'qs'

const casesService = {

    loadCases: ()=>{
        return axios({
            method: "get",
            url: "http://localhost:8080/cases",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    addNewCase: (newCase) => {

       return axios.post("http://localhost:8080/cases",null,{
           headers: {
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Credentials":"true",
               'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
               'Access-Control-Allow-Headers': 'Authorization',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
           },
           params:{
                "caseNumber": newCase.caseNumber,
                "name": newCase.name,
                "basis": newCase.basis,
                "value": newCase.value,
                "phase": newCase.phase,
                "isExecuted": newCase.isExecuted,
                "parentCaseId": newCase.parentCaseId,
                "plaintiffId": newCase.plaintiffId,
                "suedId": newCase.suedId,
                "createdBy": newCase.createdBy,
                "proxy": newCase.proxy
           }
       })
    },

    editCase: (editedCase, oldCaseId) =>{
        return axios.put("http://localhost:8080/cases/"+oldCaseId, null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "caseNumber": editedCase.caseNumber,
                "name": editedCase.name,
                "basis": editedCase.basis,
                "value": editedCase.value,
                "phase": editedCase.phase,
                "isExecuted": editedCase.isExecuted,
                "plaintiffId": editedCase.plaintiffId,
                "suedId": editedCase.suedId,
                "createdBy": editedCase.createdBy,
                "proxy": editedCase.proxy
            }
        })
    },

    addEmployeesToCase: (employees,caseId) =>{

        //console.log(employees);

        const employeesString = employees.reduce((totalStr,emp)=>{
            return totalStr+","+emp;
        });

        axios.post("http://localhost:8080/cases/addEmployees/" + caseId, null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            },
            params: {
                "employeeIds": employeesString
            }
        })
    },

    removeEmployeesFromCase: (employees, caseId) =>{

        const employeesString = employees.reduce((totalStr,emp)=>{
            return totalStr+","+emp;
        });

        //console.log(employeesString)
        return axios.put("http://localhost:8080/cases/removeEmployees/" + caseId, null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            },
            params: {
                "employeeIds": employeesString
            }
        })
    },

    deleteCase: (caseId) =>{

        //console.log(caseId)
        return axios.delete("http://localhost:8080/cases/"+caseId,{
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

export default casesService;