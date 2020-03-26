import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';


// props: onEditLawsuitEntity, theLawsuitEntity


class EditLawsuitEntity extends Component{

    constructor(props) {
        super(props);

        let option = "option1";
        if (this.props.theLawsuitEntity.company){
            option = "option2"
        }

        this.state = {
            selectedOption: option
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

        const editedLawsuitEntity = {
            "name": formData.target.lawsuitEntity_name.value,
            "emb": formData.target.lawsuitEntity_emb.value,
            "isCompany": person
        };

        //console.log(editedLawsuitEntity)

        this.props.onEditLawsuitEntity(editedLawsuitEntity,this.props.theLawsuitEntity.id);

         this.props.history.push("/allLawsuitEntities");

    };

    render() {
        return(
            <div>
                <h3>Edit the {this.props.theLawsuitEntity.name} lawsuit entity</h3>

                <form onSubmit={this.onFormSubmit} noValidate>
                    <label htmlFor={"lawsuitEntity_name"}>Name:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_name"} defaultValue={this.props.theLawsuitEntity.name}/>
                    <br/><br/>

                    <label htmlFor={"lawsuitEntity_emb"}>EMBG/EMBS:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_emb"} defaultValue={this.props.theLawsuitEntity.emb}/>
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

                        <Link to={"/allLawsuitEntities"}>
                            <button>Cancel</button>
                        </Link>
                    </div>

                    <br/>

                </form>
            </div>
        )
    }
}

export default withRouter(EditLawsuitEntity);