import React from "react";
import {Link} from "react-router-dom";


// props: lawsuitEntities


const AllLawsuitEntities = (props) =>{


    const renderPersonCompanyField = (lawsuitEntity) =>{
        if (lawsuitEntity.company)
            return <td>Company</td>;
        else
            return <td>Person</td>
    };

    return(
        <div>
            <h2>All registered lawsuit entities:</h2>

            <br/>
                <Link to={{
                    pathname: "/lawsuitEntities/add",
                    redirectPath: "/allLawsuitEntities"
                }}>
                     <button>Add new lawsuit entity</button>
                </Link>
            <br/><br/>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Person/Company</th>
                        <th>EMBG/EMBS</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.lawsuitEntities.map((le,kluc) =>
                        <tr key={kluc}>
                            <td>{le.name}</td>
                            {renderPersonCompanyField(le)}
                            <td>{le.emb}</td>
                            <td>
                                <Link to={{
                                    pathname: "/lawsuitEntities/edit/"+le.id,
                                    theLawsuitEntity: le
                                }}>
                                    <button>Edit</button>
                                </Link>

                                <button>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};


export default AllLawsuitEntities;