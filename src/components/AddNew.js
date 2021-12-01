import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react'
import "../styles/App.css";

const AddNew = (props) => {
    console.log("AddNew--props: ", props)
    let history = useHistory();

    const testsArraySize = props.tests.length;
    const newTestIdx = testsArraySize + 1;
    const testID = "TEST" + newTestIdx;

    // initLoad checks if page is first loaded
    const [initLoad, setInitLoad] = useState(true);
    const [newTestObj, setNewTestObj] = useState({});

    let newName     = React.createRef();
    let newMessage  = React.createRef();

    // modal
    const [modalOpen, setModalOpen] = React.useState(false);

    let testObj = {
        "id": "TEST3",
        "name": "test3-Name",
        "subtests": {
            "executionType": "sequential",
            "tests": [
                {
                    "id": "TEST3_SUBTEST1"
                }
            ]
        }
    }

    const routeToHome = () => {
        let path = `/`;
        history.push(path);
    }


    // useEffect gets called when [newTestObj] changes
    useEffect(() => {
        if (!initLoad) {
            console.log("newTestObj UPDATED!")
            console.log("newTestObj:", newTestObj)
            props.addNewTest(newTestObj);
        }
    }, [newTestObj]);
    const addNewTestObj = () => {
        setNewTestObj({
            ...newTestObj,
            "id": testID,
            "name": newName.current.value,
            "message": newMessage.current.value,
            "enabled": "true"
        })
    };

    return (
        <div>
            <p className="subheader-teal-h1">Add New Parent Test</p>
            <p className="subheader-teal-h2">id: TEST{newTestIdx}</p>
            {/* name */}
            <div class="ui two column grid">
                <div class="two wide column" className="label-darkgrey-h3">
                    Name: </div>
                <div class="eight wide column">
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
                <div class="two wide column" className="label-darkgrey-h3">
                    Message: </div>
                <div class="eight wide column">
                    <div class="ui fluid icon input">
                        <input type="text"
                            ref={newMessage}
                            placeholder="Input message here">
                        </input>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <button className="button-greenBg-whiteText"
                onClick={() => {
                    addNewTestObj();
                    setInitLoad(false);
                    setModalOpen(true);
                }}>  Sample Obj Append
            </button>
            {/* <br></br><br></br>
            <button className="button-greenBg-whiteText"
                onClick={() => {addNewTestObj()}}>
                Test New Object Add
            </button> */}



            {/* Modal */}
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
            // trigger={<Button>Show Modal</Button>}
            >
                <Modal.Header>{testID}</Modal.Header>
                <Modal.Content image>
                    <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
                    <Modal.Description>
                        {/* <Header>Default Profile Image</Header> */}
                        <p> {testID} has been added! </p>
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

export default AddNew;