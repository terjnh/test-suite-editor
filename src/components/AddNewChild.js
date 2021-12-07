import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import "../styles/App.css";


const AddNewChild = (props) => {
    console.log("AddNewChild.js loaded. TEST:", props.location.state.test)
    let history = useHistory();

    const { id, name } = props.location.state.test;
    const numCurrentSubtests = props.location.state.test.subtests.tests.length;
    const newSubTestID = id + "_SUBTEST" + (numCurrentSubtests + 1).toString();

    // initLoad checks if page is first loaded
    const [initLoad, setInitLoad] = useState(true);
    const [newSubTest, setNewSubTest] = useState({});
    let newName     = React.createRef();
    let newMessage  = React.createRef();

    // useEffect gets called when [newSubTest] changes
    useEffect(() => {
        if(!initLoad) {
            props.addNewSubTest(newSubTest);
        }
    }, [newSubTest])
    const addNewSubTestObj = () => {
        setNewSubTest({
            ...newSubTest,
            "id": newSubTestID,
            "name": newName.current.value,
            "message": newMessage.current.value,
            "enabled": "true"
        })
    }


    const routeToHome = () => {
        let path = `/`;
        history.push(path);
    }

    return (
        <div>
            <p className="subheader-teal-h1">Adding sub-test for... </p>
            <p className="subheader-teal-h2">{id}: {name}</p>

            {/* name */}
            <div class="ui two column grid">
                <div class="three wide column" className="label-darkgrey-h3">
                    Name: </div>
                <div class="seven wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newName}
                            placeholder="Input name here">
                        </input>
                    </div>
                </div>
            </div>

            {/* message */}
            <div class="ui two column grid">
                <div class="three wide column" className="label-darkgrey-h3">
                    Message: </div>
                <div class="seven wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newMessage}
                            placeholder="Input message here">
                        </input>
                    </div>
                </div>
            </div>


            <br></br><br></br>
            <button className="button-tealBg-whiteText"
                onClick={() => {
                    addNewSubTestObj();
                    setInitLoad(false);
                }}>  Add
            </button>
        </div>
    )

};


export default AddNewChild;