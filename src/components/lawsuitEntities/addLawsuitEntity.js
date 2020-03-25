import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import axios from 'axios';

// props: onAddLawsuitEntity


class AddLawsuitEntity extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "option1"
        }
    }

    handleOptionChange = (e) =>{
        this.setState({
            selectedOption: e.target.value
        });
    };


    onFormSubmit = (formData) =>{
        formData.preventDefault();

        let person = true;
        if (this.state.selectedOption === "option1"){
            person = false;
        }

        const newLawsuitEntity = {
            "name": formData.target.lawsuitEntity_name.value,
            "emb": formData.target.lawsuitEntity_emb.value,
            "isCompany": person
        };

        //console.log(newLawsuitEntity)

        this.props.onAddLawsuitEntity(newLawsuitEntity);

        this.props.history.push("/cases/add");

        // axios.post("http://localhost:8080/lawsuit-entities",null,{
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Credentials":"true",
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        //         'Access-Control-Allow-Headers': 'Authorization',
        //         'Content-Type': 'application/json',
        //         'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
        //     },
        //     params:{
        //         "name": formData.target.lawsuitEntity_name.value,
        //         "emb": formData.target.lawsuitEntity_emb.value,
        //         "isCompany": person
        //     }
        // })



    };

    render() {
        return(
            <div>
                <h3>Add a new lawsuit entity</h3>
                <form onSubmit={this.onFormSubmit} noValidate>
                    <label htmlFor={"lawsuitEntity_name"}>Name:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_name"} placeholder={"name"}/>
                    <br/><br/>

                    <label htmlFor={"lawsuitEntity_emb"}>EMBG/EMBS:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_emb"} placeholder={"embg/embs"}/>
                    <br/><br/>

                    <label>Is the lawsuit entity a person or a company?</label>
                    <br/>

                    <input type={"radio"}
                           id={"type_person"}
                           name={"type"}
                           value={"option1"}
                           checked={this.state.selectedOption === "option1"}
                           onChange={this.handleOptionChange}
                    />
                    <label htmlFor={"type_person"}>Person</label>

                    <input type={"radio"}
                           id={"type_company"}
                           name={"type"}
                           value={"option2"}
                           checked={this.state.selectedOption === "option2"}
                           onChange={this.handleOptionChange}
                    />
                    <label htmlFor={"type_company"}>Company</label>

                    <br/><br/><br/>


                    <div>
                        <button type="submit">Submit</button>

                        <button type="reset">Reset</button>

                        <Link to={"/cases/add"}>
                            <button>Cancel</button>
                        </Link>
                    </div>

                </form>
            </div>
        )
    }

}


export default withRouter(AddLawsuitEntity);