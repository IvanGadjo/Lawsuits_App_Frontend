import React,{Component} from "react";

// treba da bide stateful poradi toa sto ke ima form validation

class AddEmployee extends Component {


    render() {
        return(
          <div>
              <form>

                  <br/><br/>
                  <h4>Add new employee</h4>

                  <label htmlFor={'first_name'}>First name:</label>
                  <input type='text' name={'first_name'}/>
                  <label htmlFor={'last_name'}>Last name:</label>
                  <input type='text' name={'last_name'}/>

                  <br/><br/>
                  <button type={'submit'}>Add new user</button>
                  <button>Cancel</button>
                  <button type={'reset'}>Reset</button>
              </form>
          </div>
        );
    }

}

export default AddEmployee;