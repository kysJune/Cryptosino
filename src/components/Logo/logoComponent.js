//logo component for the whole site

import React from "react";
import "./Logo.css";
export let Logo = (props) =>{
    return (
        <img className="siteLogo"
          src="../../../casinoLogo.png"
           alt="casino logo"
           onClick={props.handleClick}/>
    );
};
