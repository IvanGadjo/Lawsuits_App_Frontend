import React,{useState,useEffect} from "react";
import CheckboxGroup from "react-checkbox-group";   // fixme mozebi trebba import kao kaj niv u example


// props: allEmployees, onSelectedEmployeesChange()


const EmployeeCheckboxes = (props) =>{

    const [emps,setEmps] = useState([]);


    useEffect(()=>{
        props.onSelectedEmployeesChange(emps);
    },[emps]);


    //console.log(emps)
    //console.log(props.allEmployees)
    //console.log(props)

    return(
        <CheckboxGroup name="emps" value={emps} onChange={setEmps}>
            {(Checkbox) => (
                <>
                    {props.allEmployees.map((e,kluc)=>
                        <label key={kluc}>
                            <Checkbox value={e.id}/> {e.firstName+" "+e.lastName}
                            <br/>
                        </label>
                    )}
                </>
            )}
        </CheckboxGroup>
    )
};


export default EmployeeCheckboxes;