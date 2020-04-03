import React from "react";
import axios from 'axios'


const lawsuitEntitiesService = {

    loadLawsuitEntities: ()=>{
        return axios({
            method: "get",
            url: "http://localhost:8080/lawsuit-entities",
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

    addNewLawsuitEntity: (newLawsuitEntity)=>{

        return axios.post("http://localhost:8080/lawsuit-entities",null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "name": newLawsuitEntity.name,
                "emb": newLawsuitEntity.emb,
                "isCompany": newLawsuitEntity.isCompany
            }
        })
    },

    editLawsuitEntity: (editedLawsuitEntity, oldId) =>{

        return axios.put("http://localhost:8080/lawsuit-entities/"+oldId,null,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "name": editedLawsuitEntity.name,
                "emb": editedLawsuitEntity.emb,
                "isCompany": editedLawsuitEntity.isCompany
            }
        })

    },


    // functionality implemented with hook, <AllLawsuitEntities> comp
    deleteLawsuitEntity: (id) =>{
        return axios.delete("http://localhost:8080/lawsuit-entities/"+id,{
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

    searchLawsuitEntities: (term) =>{
        return axios.get("http://localhost:8080/lawsuit-entities/search/"+term,{
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

export default lawsuitEntitiesService;