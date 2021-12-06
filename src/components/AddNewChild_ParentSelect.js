import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react'

import ParentTestItem from './ParentTestItem';
import "../styles/App.css";
import AddNewChild_ParentTestItem from "./AddNewChild_ParentTestItem";

const AddNewChild_ParentSelect = (props) => {

    for(var i = 0; i < props.tests.length; i++) {
        var obj = props.tests[i];
        console.log("item: ", obj.id, ", name: ", obj.name)
    }

    const renderParentTestList = props.tests.map((test) => {
        console.log("test:", test)
        return (
            <AddNewChild_ParentTestItem
                test={test}
            />
        );
    })

    return (
        <div>
            <div className="ui celled list">
                {renderParentTestList}
                
            </div>
        </div>
    )
};

export default AddNewChild_ParentSelect;