import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import ParentTestItem from './ParentTestItem';

const ParentTest = (props) => {
    console.log("ParentTest", props.tests);

    const renderParentTestList = props.tests.map((test) => {
        console.log("test:", test)
        return (
            <ParentTestItem
                test={test}
            />
        );
    })

    return (
        <div>
            <div className="ui celled list">
                {renderParentTestList}
            </div>

            <div className="ui celled list">
                <Link to={{
                    pathname: `/addNew`
                }}>
                    <button class="ui red button">
                        Add New Parent Test
                    </button>
                </Link>
            </div>
        </div>

    );
};


export default ParentTest;