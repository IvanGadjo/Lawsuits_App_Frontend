import React,{useState} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const CaseDetails = (props) =>{

    const defaultOption = "cc";

    const [selectedChildCase, setChildCase]=useState({
        caseNumber: 0,
        name: "tmp name",
        createdAt: "tmp date",
        basis: "tmp basis",
        value:"tmp value",
        executed: false,
        proxy: "tmp proxy",
        phase: "tmp phase",
        id: 0
    });


    const showChildCase = () =>{

      if (selectedChildCase.name === "tmp name"){
          return <tr/>
      }
      else{
          return <tr bgcolor="#f7da63">
                  <td>{selectedChildCase.caseNumber}</td>
                  <td>{selectedChildCase.name}</td>
                  <td>{selectedChildCase.createdAt}</td>
                  <td>{selectedChildCase.basis}</td>
                  <td>{selectedChildCase.value}</td>
                  <td>{selectedChildCase.executed.toString()}</td>
                  <td>{selectedChildCase.proxy}</td>

                  <td>

                      <Link to={{
                          pathname: "/employees/"+selectedChildCase.id,
                          caseId: selectedChildCase.id
                      }}>
                          <button>All Employees</button>
                      </Link>

                      <Link to={"/employees/add"}>
                          <button>Add new employee</button>
                      </Link>
                  </td>
                  <td>
                      <Link to={{
                          pathname: "/documents/"+selectedChildCase.id,
                          caseId: selectedChildCase.id
                      }}>
                          <button>All documents</button>
                      </Link>

                      <Link to={"/documents/add"}>
                          <button>Add document</button>
                      </Link>
                  </td>
                  <td>{selectedChildCase.phase}</td>
                  <td>
                      <Link to={"/cases/edit"}>
                          <button>Edit</button>
                      </Link>

                      <button>Delete</button>

                  </td>
                </tr>
      }
    };


    const onSelect = (e) =>{

        let selectedCase = props.allCases.filter(c =>{
            return c.name == e.value
        });

        //console.log(selectedCase[0]);
        setChildCase(selectedCase[0]);
        //console.log(selectedChildCase)
    };



    const loadChildCasesNames = (parentCaseId) =>{
        let menuOptions = [];

        props.allCases.filter(c =>{
            if (c.parentCase != null && parentCaseId == c.parentCase.id){
                menuOptions.push(c.name)
            }
        });

        //console.log(menuOptions);

        return menuOptions;
    };


    console.log(props.allCases)

    return(

        <tbody>

            <tr>
                <td>{props.thisCase.caseNumber}</td>
                <td>{props.thisCase.name}</td>
                <td>{props.thisCase.createdAt}</td>
                <td>{props.thisCase.basis}</td>
                <td>{props.thisCase.value}</td>
                <td>{props.thisCase.executed.toString()}</td>
                <td>{props.thisCase.proxy}</td>

                <td>

                    <Link to={{
                        pathname: "/employees/"+props.thisCase.id,
                        caseId: props.thisCase.id
                    }}>
                        <button>All Employees</button>
                    </Link>

                    <Link to={"/employees/add"}>
                        <button>Add new employee</button>
                    </Link>
                </td>
                <td>
                    <Link to={{
                        pathname: "/documents/"+props.thisCase.id,
                        caseId: props.thisCase.id
                    }}>
                        <button>All documents</button>
                    </Link>

                    <Link to={"/documents/add"}>
                        <button>Add document</button>
                    </Link>
                </td>
                <td>{props.thisCase.phase}</td>
                <td>
                    <Link to={"/cases/edit"}>
                        <button>Edit</button>
                    </Link>

                    <button>Delete</button>

                    <Dropdown options={loadChildCasesNames(props.thisCase.id)} onChange={onSelect} value={defaultOption} placeholder="Child cases" />
                </td>
            </tr>

            {showChildCase()}

        </tbody>


    )

};

export default CaseDetails;