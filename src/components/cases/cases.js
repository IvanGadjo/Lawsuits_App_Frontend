import React, {Component} from "react";
import {Link} from "react-router-dom";
import CaseDetails from "./details/caseDetails";


//props: cases


class Cases extends Component{

    render() {
        console.log(this.props);

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
                                <th>Plaintiff</th>
                                <th>Sued</th>
                                <th>Employees on <br/>this case</th>
                                <th>Documents</th>
                                <th>PHASE</th>
                                <th>Actions</th>

                        </tr>
                    </thead>


                    {this.props.cases.filter((c)=>{
                        return c.parentCase == null;
                    }).map((c,kluc)=>
                        <CaseDetails allCases={this.props.cases} parentCase={c} key={kluc}/>
                    )}


                </table>
            </div>
        );
    }

}

export default Cases;