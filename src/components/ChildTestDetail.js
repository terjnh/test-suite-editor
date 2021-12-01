import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react'

const ChildTestDetail = (props) => {
    // Navigation
    let history = useHistory();
    // console.log("ChildTestDetail-propsObject:", props.location.state.test)
    const parentPathname = props.location.pathname.split("/")[1]

    let individualTest = props.location.state.test
    const [singleSubTest, setSingleSubTest] = useState(individualTest);
    const [userInputObj, setUserInputObj] = useState({});

    const { id, name, message, scpiCommand,
        skipOnFailure, userInput, commandResult,
        typeCommand } = individualTest;


    // Check if "userInput" object exists
    let userInputObjExists = false;
    let userInputTypeExists = false;
    let userInputDataTypeExists = false;
    if (userInput !== undefined) {
        userInputObjExists = true;
        if (userInput.type !== undefined) userInputTypeExists = true;
        if (userInput.dataType !== undefined) userInputDataTypeExists = true;
    }

    // Check if "commandResult" object exists
    let cmdResultObjExists = false;
    let cmdResultDataTypeExists = false;
    let cmdResultMatchExists = false;
    if (commandResult !== undefined) {
        cmdResultObjExists = true;
        if (commandResult.dataType !== undefined) cmdResultDataTypeExists = true;
        if (commandResult.match !== undefined) cmdResultMatchExists = true;
    }


    let newName             = React.createRef();
    let newMessage          = React.createRef();
    let newScpiCommand      = React.createRef();
    let newSkipOnFailure    = React.createRef();

    let newUserInputType        = React.createRef();
    let newUserInputDataType    = React.createRef();
    let newCmdResultDataType    = React.createRef();
    let newCmdResultMatch       = React.createRef();


    //modal
    const [open, setOpen] = React.useState(false);
    const [clickCount, setClickCount] = React.useState(0);


    const updateState = () => {
        if (newUserInputDataType.current === null) console.log("userinput---dataType equals NULL")
        // 1. update sub test
        var scpiCommandFilter = false;
        newScpiCommand.current === null ? scpiCommandFilter = false : scpiCommandFilter = true
        var skipOnFailureFilter = false;
        newSkipOnFailure.current === null ? skipOnFailureFilter = false : skipOnFailureFilter = true
        var typeCommandFilter = false;
        typeCommand === undefined ? typeCommandFilter = false : typeCommandFilter = true

        console.log("typeCommandFilter:", typeCommandFilter)
        Object.keys(userInputObj).map(key => { console.log(key, ":", userInputObj[key]) })
        setSingleSubTest({
            ...singleSubTest,
            "name": newName.current.value,
            "message": newMessage.current.value,
            [scpiCommandFilter ? 'scpiCommand' : undefined]: scpiCommandFilter ? newScpiCommand.current.value : undefined,
            [skipOnFailureFilter ? 'skipOnFailure' : undefined]: skipOnFailureFilter ? newSkipOnFailure.current.value : undefined,
            // [typeCommandFilter ? 'typeCommand' : undefined]: typeCommandFilter ? typeCommand : undefined,
            [userInputObjExists ? 'userInput' : undefined]:
                userInputObjExists ? {
                    [userInputTypeExists ? 'type' : undefined]: userInputTypeExists ? newUserInputType : undefined,
                    [userInputDataTypeExists ? 'dataType' : undefined]: userInputDataTypeExists ? newUserInputDataType : undefined
                } : undefined,

            // [userInputObjExists ? "userInput" : undefined]: userInputObjExists ? userInputObj : undefined
            [cmdResultObjExists ? 'commandResult' : undefined]:
                cmdResultObjExists ? {
                    [cmdResultDataTypeExists ? 'dataType' : undefined]: cmdResultDataTypeExists ? newCmdResultDataType : undefined,
                    [cmdResultMatchExists ? 'match' : undefined]: cmdResultMatchExists ? newCmdResultMatch.current.value : undefined
                } : undefined
        });

        // console.log("singleSubTest=", singleSubTest)
        // update subtest within parent test
        props.singleTestUpdate(singleSubTest);

        let cclick = clickCount
        cclick += 1
        setClickCount(cclick);
        console.log("clickCount:", clickCount)
        if (clickCount === 2) {
            setOpen(true);
            setClickCount(0);
        }
    }

    // DropDown - "userInput": "dataType"
    const userInputDataTypeOptions = [
        { text: 'string', value: 'string' },
        { text: 'number', value: 'number' }
    ]
    const onUserinputDatatypeDropdownChanged = (e, data) => {
        newUserInputDataType = data.value;
    }
    // DropDown - "userInput": "type"
    const userInputTypeOptions = [
        { text: 'boolean', value: 'boolean' },
        { text: 'action', value: 'action' },
        { text: 'data', value: 'data' }
    ]
    const onUserinputTypeDropdownChanged = (e, data) => {
        newUserInputType = data.value;
    }

    // DropDown - "commandResult" -> "dataType"
    const cmdResultDataTypeOptions = [
        { text: 'boolean', value: 'boolean' },
        { text: 'regex', value: 'regex' },
        { text: 'number', value: 'number' },
        { text: 'string', value: 'string' }
    ]
    const onCmdResultDataTypeDropdownChanged = (e, data) => {
        newCmdResultDataType = data.value;
    }



    const routeChange = () => {
        let path = `/`;
        history.push(path);
    }

    return (
        <div>
            <h3>id: {id}</h3>
            <br></br>
            {/* name */}
            <div class="ui two column grid">
                <div class="two wide column">Name: </div>
                <div class="eight wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newName}
                            placeholder="Input name here">
                        </input>
                    </div>
                </div>
                <div class="four wide column"><b>Current Name:</b>
                    <br></br>{name}
                </div>
            </div>

            {/* message */}
            <div class="ui two column grid">
                <div class="two wide column">Message: </div>
                <div class="eight wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newMessage}
                            placeholder="Input message here">
                        </input>
                    </div>
                </div>
                <div class="four wide column"><b>Current Message:</b>
                    <br></br>{message}
                </div>
            </div>

            {/* scpiCommand - only display if current child test has "scpiCommand" key-value */}
            {individualTest.scpiCommand !== undefined ?
                <div class="ui two column grid">
                    <div class="two wide column">SCPI Command: </div>
                    <div class="eight wide column">
                        <div class="ui fluid icon input">
                            <input type="text"
                                ref={newScpiCommand}
                                placeholder="Input ScpiCommand here">
                            </input>
                        </div>
                    </div>
                    <div class="four wide column"><b>Current SCPI command:</b>
                        <br></br>{scpiCommand}
                    </div>
                </div>
                : <div></div>}

            {/* skipOnFailure - only display if current child test has "skipOnFailure" key-value */}
            {individualTest.skipOnFailure !== undefined ?
                <div class="ui two column grid">
                    <div class="two wide column">SkipOnFailure: </div>
                    <div class="eight wide column">
                        <div class="ui fluid icon input">
                            <input type="text"
                                ref={newSkipOnFailure}
                                placeholder="Input Skip-on-failure dependency">
                            </input>
                        </div>
                    </div>
                    <div class="four wide column"><b>Current SkipOnFailure command:</b>
                        <br></br>{skipOnFailure}
                    </div>
                </div>
                : <div></div>}

            {/* typeCommand - only display if current child test has "typeCommand" key-value */}
            {/* typeCommand can only be of value "PassFail" */}
            {individualTest.typeCommand !== undefined ?
                <div class="ui two column grid">
                    <div class="two wide column">Type Command: </div>
                    <div class="eight wide column">
                        <div class="ui label">
                            {typeCommand}
                        </div>
                    </div>
                </div>
                : <div></div>}




            {/* userInput - type*/}
            {userInputObjExists ?
                [userInput.type !== undefined ?
                    <div class="ui two column grid">
                        <div class="two wide column">UserInput "type": </div>
                        <div class="eight wide column">
                            <Dropdown
                                placeholder='Select'
                                name="userinputtypeoptions"
                                onChange={onUserinputTypeDropdownChanged}
                                options={userInputTypeOptions}
                            />
                        </div>
                        <div class="four wide column"><b>Current userInput-type:</b>
                            <br></br>{userInput.type}
                        </div>
                    </div> : <div></div>]
                : <div></div>}

            {/* userInput - dataType*/}
            {userInputObjExists ?
                [userInput.dataType !== undefined ?
                    <div class="ui two column grid">
                        <div class="two wide column">UserInput "dataType": </div>
                        <div class="eight wide column">
                            <Dropdown
                                placeholder='Select'
                                name="userinputdatatypeoptions"
                                onChange={onUserinputDatatypeDropdownChanged}
                                options={userInputDataTypeOptions}
                            />
                        </div>
                        <div class="four wide column"><b>Current userInput-dataType:</b>
                            <br></br>{userInput.dataType}
                        </div>
                    </div> : <div></div>]
                : <div></div>}




            {/* commandResult - dataType*/}
            {cmdResultObjExists ?
                [commandResult.dataType !== undefined ?
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
                        <div class="four wide column"><b>Current commandResult-dataType:</b>
                            <br></br>{commandResult.dataType}
                        </div>
                    </div> : <div></div>]
                : <div></div>}

            {/* Only display if current child test has "commandResult"->"match" key-value */}
            {cmdResultObjExists ?
                [commandResult.match !== undefined ?
                    <div class="ui two column grid">
                        <div class="three wide column">CommandResult "match": </div>
                        <div class="seven wide column">
                            <div class="ui fluid icon input">
                                <input type="text"
                                    ref={newCmdResultMatch}
                                    placeholder="Input commandResult->match value">
                                </input>
                            </div>
                        </div>
                        <div class="four wide column"><b>Current commandResult--match value:</b>
                            <br></br>{commandResult.match}
                        </div>
                    </div> : <div></div>]
                : <div></div>}




            <h1>---</h1>
            {/* Buttons */}
            <div class="ui two column grid">
                <div class="two wide column">
                    <button class="ui blue button"
                        onClick={() => {
                            updateState();
                        }}>
                        3x Click to Update
                    </button>
                </div>
            </div>

            {/* Update Modal */}
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            // trigger={<Button>Show Modal</Button>}
            >
                <Modal.Header>{id}</Modal.Header>
                <Modal.Content image>
                    <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
                    <Modal.Description>
                        {/* <Header>Default Profile Image</Header> */}
                        <p> {id} has been updated! </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Button color='black' onClick={() => setOpen(false)}> Nope </Button> */}
                    <Button
                        content="Okay"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {
                            setOpen(false);
                            routeChange();
                            window.location.reload(false);
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>

        </div>
    )
}

export default ChildTestDetail;