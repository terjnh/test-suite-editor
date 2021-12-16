import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Button, Modal, Image } from 'semantic-ui-react'
import "../styles/App.css";


const AddNewChild = (props) => {
    console.log("AddNewChild.js. props:", props);
    console.log("AddNewChild.js loaded. TEST:", props.location.state.test)
    let history = useHistory();

    const { id, name } = props.location.state.test;
    const numCurrentSubtests = props.location.state.test.subtests.tests.length;
    const newSubTestID = id + "_SUBTEST" + (numCurrentSubtests + 1).toString();

    // initLoad checks if page is first loaded
    const [initLoad, setInitLoad] = useState(true);
    const [newSubTest, setNewSubTest] = useState({});
    let newName = React.createRef();
    let newMessage = React.createRef();
    let newScpiCommand = React.createRef();
    let newSkipOnFailure = React.createRef();
    let newTypeCommand = React.createRef();

    let newUserInputType = React.createRef();
    let newCmdResultDataType = React.createRef();
    let newCmdResultMatch = React.createRef();

    // modal
    const [modalOpen, setModalOpen] = React.useState(false);


    // useEffect gets called when [newSubTest] changes
    useEffect(() => {
        if (!initLoad) {
            props.addNewSubTest(newSubTest);
        }
    }, [newSubTest])
    const addNewSubTestObj = () => {
        console.log("newCmdResultDataType.current:", newCmdResultDataType)
        setNewSubTest({
            ...newSubTest,
            "id": newSubTestID,
            "name": newName.current.value,
            "message": newMessage.current.value,
            "enabled": "true",
            [newScpiCommand.current.value === "" ? undefined : "scpiCommand"]:
                newScpiCommand.current.value === "" ? undefined : newScpiCommand.current.value,
            [newSkipOnFailure.current.value === "" ? undefined : "skipOnFailure"]:
                newSkipOnFailure.current.value === "" ? undefined : newSkipOnFailure.current.value,
            [newTypeCommand.current.value === "" ? undefined : "typeCommand"]:
                newTypeCommand.current.value === "" ? undefined : newTypeCommand.current.value,

            [newUserInputType.current === null ? undefined : "userInput"]:
                newUserInputType.current !== null ?
                    {
                        [newUserInputType.current === null ? undefined : "type"]: newUserInputType.current === null ? undefined : newUserInputType
                    } : undefined,

            [newCmdResultDataType.current === null ? undefined : "commandResult"]:
                newCmdResultDataType.current !== null ?
                    {
                        [newCmdResultDataType.current === null ? undefined : "dataType"]: newCmdResultDataType.current === null ? undefined : newCmdResultDataType,
                        [newCmdResultMatch.current.value === "" ? undefined : "match"]: newCmdResultMatch.current.value === "" ? undefined : newCmdResultMatch.current.value
                    } : undefined
        })
    }

    const routeToHome = () => {
        let path = `/`;
        history.push(path);
    }


    // Dropdown - "commandResult->dataType"
    const cmdResultDataTypeOptions = [
        { text: 'boolean', value: 'boolean' },
        { text: 'regex', value: 'regex' },
        { text: 'number', value: 'number' },
        { text: 'string', value: 'string' }
    ]
    const onCmdResultDataTypeDropdownChanged = (e, data) => {
        newCmdResultDataType = data.value;
    }

    // Dropdown - "userInput->type"
    const userInputTypeOptions = [
        { text: 'boolean', value: 'boolean' },
        { text: 'action', value: 'action' },
        { text: 'data', value: 'data' },
        { text: 'string', value: 'string' }
    ]
    const onUserinputTypeDropdownChanged = (e, data) => {
        newUserInputType = data.value;
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
                            placeholder="Input name">
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
                            placeholder="Input message">
                        </input>
                    </div>
                </div>
            </div>

            {/* scpiCommand */}
            <div class="ui two column grid">
                <div class="three wide column" className="label-darkgrey-h3">
                    SCPI Command: </div>
                <div class="seven wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newScpiCommand}
                            placeholder="Input SCPI command">
                        </input>
                    </div>
                </div>
            </div>

            {/* skipOnFailure */}
            <div class="ui two column grid">
                <div class="three wide column" className="label-darkgrey-h3">
                    Skip-on-failure: </div>
                <div class="seven wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newSkipOnFailure}
                            placeholder="Input skip-on-failure command">
                        </input>
                    </div>
                </div>
            </div>

            {/* typeCommand */}
            <div class="ui two column grid">
                <div class="three wide column" className="label-darkgrey-h3">
                    Type Command: </div>
                <div class="seven wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newTypeCommand}
                            placeholder="Input typeCommand command">
                        </input>
                    </div>
                </div>
            </div>


            {/* userInput - type*/}
            <div class="ui two column grid">
                <div class="three wide column">UserInput "type": </div>
                <div class="seven wide column">
                    <Dropdown
                        placeholder='Select'
                        name="userinputtypeoptions"
                        onChange={onUserinputTypeDropdownChanged}
                        options={userInputTypeOptions}
                    />
                </div>
            </div>



            {/* commandResult - dataType*/}
            <div class="ui two column grid">
                <div class="three wide column">CommandResult "dataType": </div>
                <div class="seven wide column">
                    <Dropdown
                        placeholder='Select'
                        name="cmdresultdatatypeoptions"
                        onChange={onCmdResultDataTypeDropdownChanged}
                        options={cmdResultDataTypeOptions}
                    />
                </div>
            </div>
            {/* commandResult - match */}
            <div class="ui two column grid">
                <div class="three wide column" className="label-darkgrey-h3">
                    Command Result - Match: </div>
                <div class="seven wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newCmdResultMatch}
                            placeholder="Input commandresult-match">
                        </input>
                    </div>
                </div>
            </div>


            <br></br><br></br>
            <button className="button-tealBg-whiteText"
                onClick={() => {
                    addNewSubTestObj();
                    setInitLoad(false);
                    setModalOpen(true);
                }}>  Add
            </button>




            {/* Modal */}
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
            // trigger={<Button>Show Modal</Button>}
            >
                <Modal.Header>{newSubTestID}</Modal.Header>
                <Modal.Content image>
                    <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
                    <Modal.Description>
                        {/* <Header>Default Profile Image</Header> */}
                        <p> {newSubTestID} has been added! </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Button color='black' onClick={() => setOpen(false)}> Nope </Button> */}
                    <Button
                        content="Okay"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {
                            setModalOpen(false);
                            routeToHome();
                            window.location.reload(false);
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )

};


export default AddNewChild;