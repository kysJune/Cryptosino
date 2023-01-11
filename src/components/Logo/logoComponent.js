//logo component for the whole site

import React from "react";
import "./Logo.css";

export let Logo = (props) =>{
    return (
        <div className="siteLogo"  onClick={props.handleClick}>
        </div>
    );
};
