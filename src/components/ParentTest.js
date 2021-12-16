import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import ParentTestItem from './ParentTestItem';
import '../styles/App.css'

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

        // <div class="ui placeholder segment">
        <div class="ui two column very relaxed stackable grid">


            <div class="column">
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
                        <br></br><br></br>
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
            </div> {/*column*/}


            <div class="top aligned column">
                <p className="subheader-teal-h1">Instructions: </p>
                <p className="label-darkgrey-p1">1) Ensure the parent tests are incremental in number.</p>
                <p className="label-darkgrey-p1">Example:</p>
                <p className="label-darkgrey-p1">Valid order: TEST1, TEST2, TEST3 ...</p>
                <p className="label-darkgrey-p1">Invalid order: TEST1, TEST3, TEST10 ...</p>

                <p className="label-darkgrey-p1">A bug will result in all tests deleted if parent tests are not incremental (WIP)</p>
            </div>

        </div> /*ui two column very relaxed stackable grid*/
        // </div>

    );
};


export default ParentTest;