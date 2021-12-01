import React from "react";
import { Link } from "react-router-dom";

const ChildTestItem = (props) => {
    console.log("ChildTestItem:", props.subtest)
    //destructure
    const childId = props.subtest.id
    const parentId = props.parentId
    return (
        <div>
            <br></br>
            <div>
                <Link to={{
                    pathname: `/${parentId}/${childId}`,
                    state: { test: props.subtest }
                }}>
                    <button class="ui right labeled icon button">
                        <i class="right arrow icon"></i>
                        {childId}
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default ChildTestItem;