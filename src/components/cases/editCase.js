import React, {Component, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import { useForm } from 'react-hook-form'
import axios from 'axios'


// props: theCase, lawsuitEntities, loggedInEmployee, onEditCase

// fixme: When edditing a case, the createdBy field also changes to the editor. Maybe it should stay as before


const EditCase = (props) => {


    // constructor() {
    //     super();
    //     this.state={
    //         plaintiff: {
    //             id: "/"
    //         },
    //         sued: {
    //             id: "/"
    //         }
    //     }
    // }

    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [plaintiff, setPlaintiff] = useState({
        id: "/"
    });

    const [sued, setSued] = useState({
        id: "/"
    });

    const [thisCase, setThisCase] = useState({
        caseNumber: 0,   //fixme
        name: "",
        basis: "",
        value: 0,       // fixme
        phase: "",
        isExecuted: false,
        createdBy: "",
        proxy: "",
    });


    useEffect(()=>{
        let caseId = window.location.pathname.split("/")[3];
        axios.get("http://localhost:8080/cases/"+caseId,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{
            setThisCase(resp.data);
        })
    },[]);


    // loads options for dropdowns for plaintiff and sued
    const loadLawsuitEntitiesNames = () =>{
        //console.log(this.props)
        let menuOptions = [];
        props.lawsuitEntities.forEach(le =>{
            menuOptions.push(le.name)
        });
        // console.log(menuOptions);
        return menuOptions;
    };


    const onSelectPlaintiff = (e) =>{
        let plaintiffName = e.value;
        //console.log(plaintiffName)

        let plaintiffs = props.lawsuitEntities.filter(le =>{
            return le.name === plaintiffName
        });

        //console.log(plaintiffs[0]);

        //console.log(e)
        // this.setState({
        //     plaintiff: plaintiffs[0]
        // })
        setPlaintiff(plaintiffs[0]);
    };
    const onSelectSued = (e) =>{
        let suedName = e.value;

        let sueds = props.lawsuitEntities.filter(le =>{
            return le.name === suedName
        });

        //console.log(sueds[0]);

        //console.log(e)
        // this.setState({
        //     sued: sueds[0]
        // })
        setSued(sueds[0]);
    };


    const onFormSubmit = (formData) =>{
        //formData.preventDefault();

        const editedCase = {
            caseNumber: formData.case_num,
            name: formData.case_name,
            basis: formData.case_basis,
            value: formData.case_val,
            phase: formData.case_phase,
            isExecuted: formData.case_executed,
            plaintiffId: plaintiff.id,
            suedId: sued.id,
            createdBy: props.loggedInEmployee.id,
            proxy: formData.case_proxy,
        };

        const oldCaseId = thisCase.id;

        console.log(editedCase);

        props.onEditCase(editedCase,oldCaseId);
        props.history.push("/cases");
    };

        return(
            <div>{console.log(thisCase.caseNumber)}
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <br/><br/>
                    <h4>Edit the {thisCase.name} case</h4>

                    <label htmlFor="case_num">Case number:</label>
                    <div>
                        <input type="text" name={"case_num"} id="case_num_id" defaultValue={thisCase.caseNumber}
                               ref={register({
                                   required: true,
                                   pattern:{
                                       value: /^[0-9]*$/,
                                   }
                               })}/>
                        {errors.case_num && errors.case_num.type === "required" &&
                        <p>Case number is required!</p>}
                        {errors.case_num && errors.case_num.type === "pattern" &&
                        <p>Must only contain numbers!</p>}
                    </div>

                    <label htmlFor="case_name">Case name:</label>
                    <div>
                        <input type="text" name={"case_name"} id="case_name_id" defaultValue={thisCase.name}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.case_name && errors.case_name.type === "required" &&
                        <p>Name is required!</p>}
                    </div>

                    <label htmlFor="case_basis">Basis:</label>
                    <div>
                        <textarea name={"case_basis"} id="case_basis_id" defaultValue={thisCase.basis}
                                  ref={register({
                                      required: true
                                  })}/>
                        {errors.case_basis && errors.case_basis.type === "required" &&
                        <p>Basis is required!</p>}
                    </div>

                    <label htmlFor="case_val">Value of case:</label>
                    <div>
                        <input type="text" name={"case_val"} id="case_val_id" defaultValue={thisCase.value}
                               ref={register({
                                   required: true,
                                   pattern:{
                                       value: /^[0-9]*$/,
                                   }
                               })}/>
                        {errors.case_val && errors.case_val.type === "required" &&
                        <p>Value of the case is required!</p>}
                        {errors.case_val && errors.case_val.type === "pattern" &&
                        <p>Must only contain numbers!</p>}
                    </div>

                    <label htmlFor="case_phase">Phase:</label>
                    <div>
                        <input type="text" name={"case_phase"} id="case_phase_id" defaultValue={thisCase.phase}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.case_phase && errors.case_phase.type === "required" &&
                        <p>Phase is required!</p>}
                    </div>

                    <label htmlFor="case_executed">Is the case executed:</label>
                    <div>
                        <input type="checkbox" name={"case_executed"} id="case_executed_id"
                               ref={register()}/>Executed
                    </div>


                    <label htmlFor="case_plantiff">Plaintiff:</label>
                    <div>
                        <Dropdown options={loadLawsuitEntitiesNames()}
                                  onChange={onSelectPlaintiff}
                                  value={"plaintiff"}
                                  placeholder={"plaintiffs"}
                                  id={"case_plaintiff"}
                        />
                        <Link to={{
                            pathname: "/lawsuitEntities/add",
                            redirectPath: "/cases/edit/"+thisCase.id
                            //redirectPath: "/cases"
                        }}>
                            <button>Add new plaintiff</button><br/>
                        </Link>
                    </div>



                    <label htmlFor="case_sued">Sued:</label>
                    <div>
                        <Dropdown options={loadLawsuitEntitiesNames()}
                                  onChange={onSelectSued}
                                  value={"sued"}
                                  placeholder={""}
                                  id={"case_sued"}
                        />
                        <Link to={{
                            pathname: "/lawsuitEntities/add",
                            redirectPath: "/cases/edit/"+thisCase.id
                            //redirectPath: "/cases"
                        }}>
                            <button>Add new sued</button>
                        </Link>
                    </div>
                    <br/>

                    <label htmlFor="case_proxy">Change proxy:</label>
                    <div>
                        <input type="text" name={"case_proxy"} id="case_proxy_id" defaultValue={thisCase.proxy}
                               ref={register()}/>
                    </div>

                    <br/>
                    <div>
                        <button type="submit">Save</button>
                        <Link to={"/cases"}>
                            <button>Cancel</button>
                        </Link>
                        <button type="reset">Reset</button>
                    </div>

                </form>

            </div>
        );

};

export default withRouter(EditCase);