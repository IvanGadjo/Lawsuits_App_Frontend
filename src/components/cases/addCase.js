import React,{Component} from "react";
import {Link} from "react-router-dom";


// props: employees, lawsuitEntities


class AddCase extends Component {

    constructor() {
        super();
        this.state={
            showProxyInputField: false
        }
    }


    renderProxyInputField = () => {
        if(this.state.showProxyInputField)
           return(
               <div>
                   <label htmlFor="case_proxy">Proxy:</label><br/>
                   <input type="text" name={"case_proxy"} id="case_proxy_val" placeholder=""/>
               </div>
           );
        else
            return <div/>
    };

    showProxyInputField = (e) =>{
        e.preventDefault();
        this.setState({
            showProxyInputField: true
        })
    };


    onFormSubmit = (formData) =>{
      formData.preventDefault();

      let br = "1022";
      console.log(formData.target.br.value)
    };


    render() {
        return(
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <br/><br/>
                    <h4>Add new case</h4>

                    <label htmlFor="case_num">Case number:</label>
                    <div>
                        <input type="text" name={"case_num"} id="case_num_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_name">Case name:</label>
                    <div>
                        <input type="text" name={"case_name"} id="case_name_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_createdAt">Input date:</label>
                    <div>
                        <input type="date" name={"case_createdAt"} id="case_num_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_basis">Basis:</label>
                    <div>
                        <textarea name={"case_basis"} id="case_basis_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_val">Value of case:</label>
                    <div>
                        <input type="text" name={"case_val"} id="case_num_val" placeholder=""/>
                    </div>


                    {/*fixme*/}

                    <label htmlFor="case_emps">Assign employees:</label>
                    <div>
                        {this.props.employees.map((e) =>
                            [e.firstName+" "+e.lastName,e.id]
                        ).map((niza,kluc)=>
                            <div key={kluc}>
                                <input type={"checkbox"} value={niza[1]}/>{niza[0]}
                            </div>
                        )}
                    </div>


                    <label htmlFor="case_plantiff">Plaintiff:</label>
                    <div>
                        <select name={"case_plaintiff"} id="case_plaintiff_id">
                            {this.props.lawsuitEntities.map(le=>
                                [le.name,le.id]
                            ).map((niza,kluc)=>
                                <option value={niza[1]} key={kluc}>{niza[0]}</option>
                            )}
                        </select>

                        <Link to={"/lawsuitEntities/add"}>
                            <button>Add new plaintiff</button><br/>
                        </Link>
                    </div>



                    <label htmlFor="case_sued">Sued:</label>
                    <div>
                        <select name={"case_sued"} id="case_sued_id">
                            {this.props.lawsuitEntities.map(le=>
                                [le.name,le.id]
                            ).map((niza,kluc)=>
                                <option value={niza[1]} key={kluc}>{niza[0]}</option>
                            )}
                        </select>

                        <Link to={"/lawsuitEntities/add"}>
                            <button>Add new sued</button>
                        </Link>
                    </div>


                    <div>
                        <button onClick={this.showProxyInputField}>Add a proxy</button>
                        {this.renderProxyInputField()}
                    </div>

                    <div>
                        <button type="submit">Save</button>
                        <Link to={"/cases"}>
                            <button>Cancel</button>
                        </Link>
                        <button type="reset">Reset</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default AddCase;