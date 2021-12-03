import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChildTest from "./ChildTest";
import ChildTestDetail from "./ChildTestDetail";

const ParentTestDetail = (props) => {
    const [childTests, setChildTests] = useState([]);

    const { id, name, subtests } = props.location.state.test;
    // console.log("ParentTestDetail:", props.location.state.test);
    // console.log("ParentTestDetail-id:", id);


    // testing subtests deconstruction
    // pass subtests.tests into another component
    //const subId = subtests.tests[0].id
    const childTestsArray = subtests.tests

    const setChildTestsFn = (childTestsArray) => {
        setChildTests(childTestsArray)
    }


    const getChildTests = (childTests) => {
        console.log("CHILD TESTS:", childTests)
    }

    // useEffect called when async setChildTests is completed
    useEffect(() => {
        console.log("ParentTestDetail.js - childTests updated!")
        props.parentTestUpdate(childTests);
    }, [childTests])
    // Parse singleSubTest from Child(ChildTestDetail.js) ---> Parent(ParentTestDetail.js)
    const onSingleTestUpdate = (singleSubTest) => {
        console.log("ParentTestDetail.js-onSingleTestUpdate()")
        setChildTests(childTestsArray);

        // Check if ID is same, if so, update the jsonArray state `childTests` 
        setChildTests(childTests => childTests.map(
            obj => obj.id === singleSubTest.id ? singleSubTest : obj
        ));
        // props.parentTestUpdate(childTests);
    }

    return (
        <div className="ui container">
            <Router>
                <Switch>
                    <Route
                        path="/:id"
                        exact
                        render={(props) => (
                            <ChildTest
                                {...props}
                                childTests={childTests}
                            />
                        )}
                    />

                    <Route
                        path="/:parentId/:childId"
                        exact
                        render={(props) => (
                            <ChildTestDetail
                                {...props}
                                singleTestUpdate={onSingleTestUpdate}
                            />
                        )}
                    />
                </Switch>
            </Router>
            {/* Buttons */}
            <div class="ui two column grid">
                <div class="two wide column">
                    {/* <button class="ui blue button"
                        onClick={() => {
                            getChildTests();
                        }}>
                        getSubTests
                        (Used for testing)
                    </button> */}
                </div>
            </div>

        </div>

    )
}


export default ParentTestDetail;