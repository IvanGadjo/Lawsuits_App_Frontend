import React,{Component} from "react";
import {Link, withRouter} from "react-router-dom";


// props: theCaseId, allCases, courts, loggedInEmployee, onUploadDocument


class AddDocument extends Component{

    constructor(props) {
        super();
        this.state = {
            selectedFile: {},
            selectedOption: props.courts[0].id
        }
    }

    findNameOfCase = () =>{
        const name = this.props.allCases.find(c => c.id == this.props.theCaseId);
        return <span>{name.name}</span>;
    };

    handleOptionChange = (e) =>{
        this.setState({
            selectedOption: e.target.value
        })
    };

    onFileChangeHandler = (e) =>{
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        })

    };


    onFormSubmit = (data) =>{
        data.preventDefault();


        const formData = new FormData();

        formData.append("file",this.state.selectedFile);
        const otherParams = {
            "archiveNumber": data.target.doc_archiveNum.value,
            "isInput": data.target.doc_isInput.checked,
            "documentDate": data.target.doc_date.value,
            "employeeId": this.props.loggedInEmployee.id,
            "courtId":this.state.selectedOption,
            "caseId": this.props.theCaseId
        };

        //new Response(formData).text().then(console.log)
        this.props.onUploadDoc(formData, otherParams);

        this.props.history.push('/cases')
    };

    render() {
        return(
          <div>
              <h3>Add a document to the {this.findNameOfCase()} case:</h3>

              <form onSubmit={this.onFormSubmit}>

                  <label htmlFor={'upload-file'}>Upload new document:</label><br/>
                  <input type={'file'} name={'upload-file'} onChange={this.onFileChangeHandler}/><br/><br/>

                  <label htmlFor={"doc_archiveNum"}>Archive number:</label><br/>
                  <input type={"text"} name={"doc_archiveNum"}/><br/>

                  <input type={"checkbox"} name={"doc_isInput"}/>
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
                                 onChange={this.handleOptionChange}
                          />

                          <label htmlFor={"court"}>{c.name}</label>
                      </div>
                  )}

                  <button type={'submit'}>Submit</button>
                  <Link to={"/cases"}>
                    <button>Cancel</button>
                  </Link>
              </form>
          </div>
        );
    }
}

export default withRouter(AddDocument);