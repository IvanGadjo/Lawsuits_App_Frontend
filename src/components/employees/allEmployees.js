import React,{Component} from "react";

// todo: treba na backend da imas vo casesAPI get all cases by employee id
// tuka so hooks ke pravis povik kon toa api so sekoj id od userite za da mozes da gi pretstavis site cases na koi rabotat

const AllEmployees = (props) =>{

    console.log(props);

    return(
        <div>
            <table id='cases-table'>
                <tbody>
                    {props.employees.map(e =>
                        <tr>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{e.id}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default AllEmployees;