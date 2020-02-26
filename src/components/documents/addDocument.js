import React,{Component} from "react";

class AddDocument extends Component{



    // ako koristis this vo ova ke mora da go bindnes vo constructor
    onFormSubmit = (data) =>{
        debugger;
        data.preventDefault();
        var formData = new FormData();
        formData.append("file",data);

        console.log(formData);      // nest treba tuka da se popravi
    };

    render() {
        return(
          <div>
              <form onSubmit={this.onFormSubmit}>
                  <label htmlFor={'upload-file'}>Upload new document:</label>
                  <input type={'file'} name={'upload-file'}/>

                  <button type={'submit'}>Submit</button>
                  <button>Cancel</button>
              </form>
          </div>
        );
    }
}

export default AddDocument;