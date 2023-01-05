//header component 
import React from 'react';
import {Logo} from '../Logo/logoComponent';
import "./header.css"

export let Header = () =>{
    return(
        <div className="Header">
            
            <Logo/>

            <div id='header-links'>
                <a href=''>Login</a>            
                <a href=''>Register</a>            
            </div>
            
        </div>        
    );
}

