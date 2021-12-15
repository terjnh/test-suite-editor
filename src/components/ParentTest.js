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
                    pathname: `/addNewParent`
                }}>
                    <button class="ui blue button">
                        Add New Parent Test
                    </button>
                </Link>

                <Link to={{
                    pathname: `\addNewChild_ParentSelect`
                }}>
                    <button class="ui blue button">
                        Add New Sub-Test
                    </button>
                </Link>

                <br></br><br></br>

                <Link to={{
                    pathname: `\deleteParent`
                }}>
                    <button class="ui red button">
                        Delete Parent Test
                    </button>
                </Link>
            </div>

        </div>

    );
};


export default ParentTest;