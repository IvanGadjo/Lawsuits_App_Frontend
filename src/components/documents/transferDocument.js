import React, {useState} from "react";
import Dropdown from 'react-dropdown';
import {Link, withRouter} from "react-router-dom";


// props: theDocumentInfo, thisCaseId, cases, moveDocsBetweenCases


const TransferDocument = (props) =>{


    const [newCaseId, setNewCaseId] = useState(0);

    const loadCaseNames = () =>{
        let menuOptions = [];
        props.cases.filter(c =>{
            return c.id != props.thisCaseId
        }).forEach(c =>{
            menuOptions.push(c.name)
        })

        return menuOptions;
    };

    const onSelectNewCase = (e) =>{
        let caseName = e.value;

        let allCases = props.cases.filter(c =>{
            return c.name === caseName
        });

        setNewCaseId(allCases[0].id);
    };

    const onFormSubmit = (e) =>{
        e.preventDefault();

        let docArray = [props.theDocumentInfo.id];

        props.onMoveDoc(docArray,newCaseId, props.thisCaseId);
        //console.log(newCaseId)
        //props.history.push("/documents/"+props.thisCaseId)
        props.history.push('/cases')
    };

    return(
        <div>
            <h4>Transfer document {props.theDocumentInfo.name} to another case</h4>
            <div className={"col-2"}>
                <form onSubmit={onFormSubmit}>
                    <Dropdown options={loadCaseNames()}
                              onChange={onSelectNewCase}
                              value={"new case"}
                              placeholder={"new case"}
                              id={"newCase_id"}
                    />

                    <button type={"submit"} id={"button"} className={"btn"}>Submit</button>
                    <Link to={"/documents/"+props.thisCaseId}>
                        <button id={"button"} className={"btn"}>Cancel</button>
                    </Link>
                </form>
            </div>
        </div>
    )
};

export default withRouter(TransferDocument);