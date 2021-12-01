import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import ChildTestItem from "./ChildTestItem";

const ChildTest = (props) => {
    console.log("ChildTest-parentID:", props.location.state.test.id)
    console.log("ChildTests-PROP:", props.location.state.test.subtests.tests)

    const parentId = props.location.state.test.id
    const renderChildTestList = props.location.state.test.subtests.tests.map((subtest) => {
        return (
            <ChildTestItem
                subtest={subtest}
                parentId={parentId}
            />
        );
    })
    return(
        <div className="ui celled list">
            {renderChildTestList}
        </div>
    );
}


export default ChildTest;