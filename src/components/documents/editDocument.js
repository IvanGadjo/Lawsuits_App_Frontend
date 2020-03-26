import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';

// props: onEditDocument, theDocumentInfo, theCaseId, courts, loggedInEmployee

// fixme: When edditing a doc, the createdBy field also changes to the editor. Maybe it should stay as before

class EditDocument extends Component{

    constructor(props) {
        super();

        this.state = {
            selectedOption: props.courts[0].id
        };

        console.log(props.courts)
    }

    handleOptionChange = (e) =>{

        console.log(e.target.value)

        this.setState({
            selectedOption: e.target.value
        })
    };


    onFormSubmit = (formData) =>{
        formData.preventDefault();

        const editedDoc = {
          "archiveNumber": formData.target.doc_archiveNumber.value,
          "isInput": formData.target.doc_isInput.checked,
          "documentDate": formData.target.doc_date.value,
          "employeeId": this.props.loggedInEmployee.id,
          "courtId": this.state.selectedOption,
          "caseId": this.props.theCaseId
        };

        const oldId = this.props.theDocumentInfo.id;

        this.props.onEditDocument(editedDoc,oldId);

        // this.props.history.push("/documents/"+this.props.theCaseId);
        this.props.history.push("/cases");
    };


    render() {
        return(
            <div>
                <h3>Edit the info for {this.props.theDocumentInfo.name}</h3>
                <br/>

                <form onSubmit={this.onFormSubmit} noValidate>
                    <label htmlFor={"doc_archiveNumber"}>New archive number:</label>
                    <input type={"text"} name={"doc_archiveNumber"} defaultValue={this.props.theDocumentInfo.archiveNumber}/>
                    <br/><br/>

                    <input type={"checkbox"} name={"doc_isInput"} defaultChecked={this.props.theDocumentInfo.input}/>
                    Is this document an input document to our company?
                    <br/><br/>

                    <label htmlFor="doc_date">New input date:</label>
                    <div>
                        <input type="date" name={"doc_date"} id="doc_date_id"/>
                    </div>
                    <br/><br/>


                    {this.props.courts.map((c,kluc) =>
                        <div key={kluc}>
                        <input type={"radio"}
                               //id={c.id}
                               name={"court"}
                               value={c.id}
                               defaultChecked={this.state.selectedOption === c.id}
                               onChange={this.handleOptionChange}
                        />

                        <label htmlFor={"court"}>{c.name}</label>
                        </div>
                    )}

                    <button type="submit">Submit</button>
                    <button type={"reset"}>Reset</button>
                    <Link to={"/documents/"+this.props.theCaseId}>
                        <button>Cancel</button>
                    </Link>
                </form>
            </div>
        )
    }
}


export default withRouter(EditDocument);