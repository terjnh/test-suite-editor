import React from "react";
import { Link } from "react-router-dom";
import ParentTest from "./ParentTest";


const ParentTestItem = (props) => {
    // console.log("ParentTestItem:", props)
    // destructure
    const { id, name } = props.test;
    return (
        <div>
            <div>
                <Link to={{
                    pathname: `${id}`,
                    state: { test: props.test }
                }}>
                    <button class="ui right labeled icon button">
                        <i class="right arrow icon"></i>
                        {id}
                        <p>{name}</p>
                    </button>
                </Link>

            </div>
            <br></br>
        </div>

    )
}


export default ParentTestItem;