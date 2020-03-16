import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost/8080',
    headers:{
        'Access-Control-Allow-Origin': '*'
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',//
        // "Access-Control-Allow-Credentials":"true",//
        // 'Access-Control-Allow-Headers': 'Authorization'//
    }
});


export default instance;


// fixme: Ne se koristi nigde ova
