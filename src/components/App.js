import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import { uuid } from 'uuidv4'

import Header from "./Header";
import api from '../api/config';
import ParentTest from "./ParentTest";
import ParentTestDetail from "./ParentTestDetail";
import AddNewParent from "./AddNewParent"
import AddNewChild_ParentSelect from "./AddNewChild_ParentSelect";
import AddNewChild from "./AddNewChild";

function App() {
    const [tests, setTests] = useState([]);

    const retrieveConfigData = async () => {
        const response = await api.get("/tests");
        // console.log("Response:", response)
        return response.data;
    }

    // Upon page refresh, we will retrieve all tests from ../test-suite-server/config.json
    useEffect(() => {
        const getAllTests = async () => {
            const allTests = await retrieveConfigData();
            if (allTests) {
                // Update the state
                setTests(allTests);
            }
        };

        getAllTests();
    }, []);

    useEffect(() => {
    }, [tests]);


    const onParentTestUpdate = (childTests) => {
        if (childTests.length !== 0) {
            // Obtain available parent IDs
            const parentId = childTests[0].id.split("_")[0]
            // console.log("ParentID:", parentId)

            tests.map((test) => {
                // console.log("PARENT-testid:", test.id)
                if (test.id === parentId) {
                    test.subtests.tests = childTests;
                    updateConfigJson(test)
                }
            });
            // console.log("ALL TESTS:", tests)
        }

    }

    const onAddNewTest = (testObj) => {
        console.log("App.js->addNewTest");
        console.log(testObj);

        configJsonAddNewParent(testObj);
    }

    const onAddNewSubTest = (newSubTest) => {
        console.log("App.js->newSubTest:", newSubTest)
        //TODO: Implement addition of subtest into appropriate parent test
    }


    const updateConfigJson = async (test) => {
        const response = await api.put(`/tests/${test.id}`, test)
        // console.log("response.data:", response.data)

        // setTests(tests);
    }

    const configJsonAddNewParent = async (testObj) => {
        const response = await api.post(`/tests/`, testObj)
    }


    return (
        <div className="ui container">
            <Router>
                <Header />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <ParentTest
                                {...props}
                                tests={tests}
                            />
                        )}
                    />
                    <Route
                        path="/addNewChild/:id"
                        exact
                        render={(props) => (
                            <AddNewChild
                                {...props}
                                tests={tests}
                                addNewSubTest={onAddNewSubTest}
                            />
                        )}
                    />

                    <Route
                        path="/addNewParent"
                        exact
                        render={(props) => (
                            <AddNewParent
                                {...props}
                                tests={tests}
                                addNewTest={onAddNewTest}
                            />
                        )}
                    />

                    <Route
                        path="/addNewChild_ParentSelect"
                        exact
                        render={(props) => (
                            <AddNewChild_ParentSelect
                                {...props}
                                tests={tests}
                            />
                        )}
                    />


                    <Route
                        path="/:id"
                        exact
                        render={(props) => (
                            <ParentTestDetail
                                {...props}
                                parentTestUpdate={onParentTestUpdate}
                            />
                        )}
                    />

                </Switch>
            </Router>




            <div class="ui two column grid">
                <div class="two wide column">
                    {/* <button class="ui red button"
                        onClick={() => {
                            updateConfigJson(tests[0]);
                        }}>
                        UPDATE JSON
                    </button> */}
                </div>
            </div>
        </div>
    );

}

export default App;