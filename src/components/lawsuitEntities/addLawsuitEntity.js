import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form'

// props: onAddLawsuitEntity, redirectPath


const AddLawsuitEntity = (props) =>{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedOption: "option1"
    //     }
    //
    //     //console.log(this.props.redirectPath)
    // }

    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption, setSelectedOpt] = useState("option1");


    const handleOptionChange = (e) =>{
        // this.setState({
        //     selectedOption: e.target.value
        // });
        setSelectedOpt(e.target.value)
    };


    const onFormSubmit = (formData) =>{
        //formData.preventDefault();
        //console.log(formData);
        let person = true;
        if (selectedOption === "option1"){
            person = false;
        }

        const newLawsuitEntity = {
            "name": formData.lawsuitEntity_name,
            "emb": formData.lawsuitEntity_emb,
            "isCompany": person
        };

        //console.log(newLawsuitEntity);


        // let person = true;
        // if (selectedOption === "option1"){
        //     person = false;
        // }
        //
        // const newLawsuitEntity = {
        //     "name": formData.target.lawsuitEntity_name.value,
        //     "emb": formData.target.lawsuitEntity_emb.value,
        //     "isCompany": person
        // };
        //
        // console.log(newLawsuitEntity)

        props.onAddLawsuitEntity(newLawsuitEntity);

        props.history.push(props.redirectPath);





    };


        return(
            <div>
                <h3>Add a new lawsuit entity</h3>
                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <label htmlFor={"lawsuitEntity_name"}>Name:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_name"} name={"lawsuitEntity_name"} placeholder={"name"}
                           ref={register({
                               required: true
                           })} />
                    {errors.lawsuitEntity_name && <p>Name is required!</p>}
                    <br/><br/>

                    <label htmlFor={"lawsuitEntity_emb"}>EMBG/EMBS:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_emb"} name={"lawsuitEntity_emb"}
                           placeholder={"embg/embs"}
                           ref={register({
                               required: true,
                               pattern:{
                                   value: /^[0-9]*$/,
                                   message: 'error message'
                               }
                           })}/>
                    {errors.lawsuitEntity_emb && errors.lawsuitEntity_emb.type === "required" &&
                    <p>The embg/embs is required!</p>}
                    {errors.lawsuitEntity_emb && errors.lawsuitEntity_emb.type === "pattern" &&
                    <p>Must only contain numbers</p>}

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

                        <Link to={props.redirectPath}>
                            <button>Cancel</button>
                        </Link>
                    </div>

                </form>
            </div>
        )

}


export default withRouter(AddLawsuitEntity);