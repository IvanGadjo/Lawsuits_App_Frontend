import React, {Component} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios'

//  fixme: moze onSelect da pali nov screen so component CaseDetails kaj so ke ima detali za childCase

class Cases extends Component{

    defaultOption = "cc";



    onSelect = (e) =>{

        let selectedCase = this.props.cases.filter(c =>{
            return c.name == e.value
        });

        console.log(selectedCase)
    };

    loadChildCasesNames = (parentCaseId) =>{
        let menuOptions = [];

        this.props.cases.filter(c =>{
            if (c.parentCase != null && parentCaseId == c.parentCase.id){
                menuOptions.push(c.name)
            }
        });

        //console.log(menuOptions);

        return menuOptions;
    };



    render() {
        console.log(this.props.cases);

        return (
            <div>
                <h2>Cases:</h2>

                <Link to={"/cases/add"}>
                    <button>Add new case</button>
                </Link>

                <table id={"cases-table"}>
                    <thead>
                        <tr>

                                <th>Case number</th>
                                <th>Case name</th>
                                <th>Created at</th>
                                <th>Basis</th>
                                <th>Value</th>
                                <th>Is executed</th>
                                <th>Proxy</th>
                                <th>Employees on <br/>this case</th>
                                <th>Documents</th>
                                <th>PHASE</th>
                                <th>Actions</th>

                        </tr>
                    </thead>

                    <tbody>

                    {this.props.cases.filter((c)=>{
                        return c.parentCase == null;            // ova za da renderne na pocetok samo lista od parent cases
                                                                // pa od dropdown-ot se biraat child cases
                    }).map((c,index)=>

                        <tr key={index}>

                            <td>{c.caseNumber}</td>
                            <td>{c.name}</td>
                            <td>{c.createdAt}</td>
                            <td>{c.basis}</td>
                            <td>{c.value}</td>
                            <td>{c.executed.toString()}</td>
                            <td>{c.proxy}</td>

                            <td>

                                <Link to={{
                                    pathname: "/employees/"+c.id,
                                    caseId: c.id
                                }}>
                                    <button>All Employees</button>
                                </Link>

                                <Link to={"/employees/add"}>
                                    <button>Add new employee</button>
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: "/documents/"+c.id,
                                    caseId: c.id
                                }}>
                                    <button>All documents</button>
                                </Link>

                                <Link to={"/documents/add"}>
                                    <button>Add document</button>
                                </Link>
                            </td>
                            <td>{c.phase}</td>
                            <td>
                                <Link to={"/cases/edit"}>
                                    <button>Edit</button>
                                </Link>

                                <button>Delete</button>

                                <Dropdown options={this.loadChildCasesNames(c.id)} onChange={this.onSelect} value={this.defaultOption} placeholder="Child cases" />
                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>
            </div>
        );
    }

}

export default Cases;