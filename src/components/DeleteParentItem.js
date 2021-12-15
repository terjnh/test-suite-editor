import React, { useEffect } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react'

const DeleteParentItem = (props) => {
    console.log("DeleteParentItem---props:", props);

    // destructure
    const { id, name } = props.test;

    const [testID, setTestID] = React.useState();
    // modal
    const [modalOpen, setModalOpen] = React.useState(false);

    // useEffect gets called when [testID] changes
    useEffect(() => {
        props.deleteParent(testID);
    }, [testID])
    // method to send parent test id to App.js for deletion
    const deleteParentTest = (selectedID) => {
        console.log("selectedID:", selectedID)
        setTestID(selectedID);
    }


    return (
        <div>
            <button class="ui yellow button"
                onClick={() => {
                    setModalOpen(true);
                }}>
                {id} : {name}
            </button>
            <br></br><br></br>

            {/* Modal */}
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
            // trigger={<Button>Show Modal</Button>}
            >
                <Modal.Header>{id}</Modal.Header>
                <Modal.Content image>
                    <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
                    <Modal.Description>
                        {/* <Header>Default Profile Image</Header> */}
                        <p>Would you like to delete {id}: {name} ? </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black'
                        onClick={() => setModalOpen(false)}>
                        Nope </Button>
                    <Button
                        content="Yes"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {
                            deleteParentTest(id);
                            setModalOpen(false);
                            // routeToHome();
                            // window.location.reload(false);
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default DeleteParentItem;