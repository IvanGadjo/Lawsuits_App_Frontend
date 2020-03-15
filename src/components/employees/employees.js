import React,{useState,useEffect} from 'react';


class Employees extends React.Component{

    // const [casesOfEmployee, setCases] = useState({
    //    cases:[]
    // });

    // useEffect({
    //
    // },[]);



    render() {

        console.log(this.props);

        return (
            <div>
                <ul>
                    <li>
                        <ul>
                            <h6>Employee 1</h6>
                            <li>Firstname 1</li>
                            <li>Lastname 1</li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <h6>Employee 2</h6>
                            <li>Firstname 2</li>
                            <li>Lastname 2</li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
};

export default Employees;