import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';


const AddNewChild = (props) => {
    console.log("AddNewChild.js loaded. TEST:", props.location.state.test)

    const { id, name } = props.location.state.test;

    return (
        <div>
            <h3>Adding Sub-Test -> {id}: {name}</h3>
        </div>
    )

};


export default AddNewChild;