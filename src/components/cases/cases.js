import React,{Component} from "react";
import {Link} from "react-router-dom";


class Cases extends Component{


    render() {

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

                    {this.props.cases.map((c,index)=>
                        <tr>

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
                                <Link to={"/documents"}>
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