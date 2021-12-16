import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddNewChild from "./AddNewChild";

const AddNewChild_ParentTestItem = (props) => {
    console.log("AddNewChild_ParentTestItem---props:", props)
    // destructure
    const { id, name } = props.test;
    return (

        <div>
            <div>
                <Link to={{
                    pathname: `addNewChild/${id}`,
                    state: { test: props.test }
                }}>
                    <button class="ui blue button">
                        {id}: {name}
                    </button>
                </Link>
            </div>

            <br></br>
        </div>
    )
}


export default AddNewChild_ParentTestItem;