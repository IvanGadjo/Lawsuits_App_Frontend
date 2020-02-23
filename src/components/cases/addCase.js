import React,{Component} from "react";
import {Link} from "react-router-dom";


class AddCase extends Component {

    render() {
        return(
            <div>
                <form>
                    <br/><br/>
                    <h4>Add new case</h4>

                    <label htmlFor="case_num">Input number:</label>
                    <div>
                        <input type="text" name={"case_num"} id="case_num_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_name">Input name:</label>
                    <div>
                        <input type="text" name={"case_name"} id="case_name_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_createdAt">Input date:</label>
                    <div>
                        <input type="date" name={"case_createdAt"} id="case_num_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_basis">Input basis:</label>
                    <div>
                        <input type="text" name={"case_basis"} id="case_basis_id" placeholder=""/>
                    </div>

                    <label htmlFor="case_val">Input value:</label>
                    <div>
                        <input type="text" name={"case_val"} id="case_num_val" placeholder=""/>
                    </div>

                    <label htmlFor="case_proxy">Input proxy:</label>
                    <div>
                        <input type="text" name={"case_proxy"} id="case_proxy_val" placeholder=""/>
                    </div>

                    <label htmlFor="case_emps">Input employees:</label>
                    <div>
                        <select name={"case_emps"} id="case_emps_id">
                            <option value={"employee 1"}> Emp 1</option>
                            <option value={"employee 2"}> Emp 2</option>
                        </select>
                    </div>

                    <label htmlFor="case_plantiff">Input plantiff:</label>
                    <div>
                        <input type="text" name={"case_plantiff"} id="case_plantiff_val" placeholder=""/>
                    </div>

                    <label htmlFor="case_sued">Input sued:</label>
                    <div>
                        <input type="text" name={"case_sued"} id="case_sued_val" placeholder=""/>
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