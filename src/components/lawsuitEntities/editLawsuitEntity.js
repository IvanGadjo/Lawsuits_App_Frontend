import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form'


// props: onEditLawsuitEntity, theLawsuitEntity


const EditLawsuitEntity = (props) =>{


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption, setSelectedOpt] = useState("option1");

    const handleOptionChange = (e) =>{
        setSelectedOpt(e.target.value);
    };


    const onFormSubmit = (formData) =>{
        //formData.preventDefault();
        //console.log(formData)
        let person = true;
        if (selectedOption === "option1"){
            person = false;
        }

        const editedLawsuitEntity = {
            "name": formData.lawsuitEntity_name,
            "emb": formData.lawsuitEntity_emb,
            "isCompany": person
        };

        //console.log(editedLawsuitEntity);

        props.onEditLawsuitEntity(editedLawsuitEntity,props.theLawsuitEntity.id);

        props.history.push("/allLawsuitEntities");

    };

    return(
        <div>
                <h3>Edit the {props.theLawsuitEntity.name} lawsuit entity</h3>

                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <label htmlFor={"lawsuitEntity_name"}>Name:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_name"} name={"lawsuitEntity_name"}
                           defaultValue={props.theLawsuitEntity.name}
                           ref={register({
                               required: true
                           })}/>
                    {errors.lawsuitEntity_name && <p>Name is required!</p>}
                    <br/><br/>

                    <label htmlFor={"lawsuitEntity_emb"}>EMBG/EMBS:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_emb"} name={"lawsuitEntity_emb"}
                           defaultValue={props.theLawsuitEntity.emb}
                           ref={register({
                               required: true,
                               pattern:{
                                   value: /^[0-9]*$/,
                               }
                           })}/>
                    {errors.lawsuitEntity_emb && errors.lawsuitEntity_emb.type === "required" &&
                    <p>The embg/embs is required!</p>}
                    {errors.lawsuitEntity_emb && errors.lawsuitEntity_emb.type === "pattern" &&
                    <p>Must only contain numbers!</p>}
                    <br/><br/>

                    <label>Is the lawsuit entity a person or a company?</label>
                    <br/>

                    <input type={"radio"}
                           id={"type_person"}
                           name={"type"}
                           value={"option1"}
                           checked={selectedOption === "option1"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_person"}>Person</label>

                    <input type={"radio"}
                           id={"type_company"}
                           name={"type"}
                           value={"option2"}
                           checked={selectedOption === "option2"}
                           onChange={handleOptionChange}
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

};

export default withRouter(EditLawsuitEntity);