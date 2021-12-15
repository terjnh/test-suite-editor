import React, { useState, useEffect } from "react";
import DeleteParentItem from "./DeleteParentItem";

const DeleteParent = (props) => {
    for(var i = 0; i < props.tests.length; i++) {
        var obj = props.tests[i];
        console.log("item: ", obj.id, ", name: ", obj.name)
    }

    const onDeleteParent = (testID) => {
        // parse `testID` to App.js
        props.onDeleteParent(testID);
    }

    const renderParentTestList = props.tests.map((test) => {
        console.log("test:", test)
        return (
            <DeleteParentItem
                test={test}
                deleteParent={onDeleteParent}
            />
        );
    })
    

    return(
        <div>
            <div className="ui celled list">
                {renderParentTestList}
            </div>
        </div>
    )
};

export default DeleteParent;