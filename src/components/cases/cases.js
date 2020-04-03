import React, {Component} from "react";
import {Link} from "react-router-dom";
import CaseDetails from "./details/caseDetails";
import FormSearch from "../FormSearch";
import ChildCaseDetails from "./details/childCaseDetails";


//props: cases, onDeleteCase, onSearch, onClickReset


class Cases extends Component{


    showCasesDetails = () =>{
        const len = this.props.cases.filter((c)=>{
            return c.parentCase == null;
        }).length;

        console.log(len);

        if (len == 0){
            // render child cases kako obicni cases
            return (
                <tbody>
                {this.props.cases.map((c,kluc)=>
                    <ChildCaseDetails childCase={c}
                                      colapseCallback={()=>{console.log("colapse not implemented")}}
                                      onDeleteCase={this.props.onDeleteCase}
                                      shouldHaveCollapseButton={false}
                                      key={kluc}/>
                )}
                </tbody>
            )
        }
        else{
            // normalen render
            return(
                this.props.cases.filter((c)=>{
                    return c.parentCase == null;
                }).map((c,kluc)=>
                        <CaseDetails allCases={this.props.cases}
                                     parentCase={c} key={kluc}
                                     onDeleteCase={this.props.onDeleteCase}/>
                                     )
            )
        }
    };

    render() {
        //console.log(this.props);

        return (
            <div>
                <br/><br/>
                    <FormSearch onSearch={this.props.onSearch}
                                onClickReset={this.props.onClickReset}/>
                <br/>

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


                    {/*{this.props.cases.filter((c)=>{*/}
                    {/*    return c.parentCase == null;*/}
                    {/*}).map((c,kluc)=>*/}
                    {/*    <CaseDetails allCases={this.props.cases}*/}
                    {/*                 parentCase={c} key={kluc}*/}
                    {/*                 onDeleteCase={this.props.onDeleteCase}/>*/}
                    {/*)}*/}


                    {this.showCasesDetails()}


                </table>
            </div>
        );
    }

}

export default Cases;