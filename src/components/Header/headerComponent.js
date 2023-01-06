//header component 
import React from 'react';
import {Logo} from '../Logo/logoComponent';
import "./header.css"

export let Header = (props) =>{
    return(
        <div className="Header">
            
            <Logo handleClick={props.goHome}/>

            <div id='header-links'>
                <button id="login-button" onClick={props.handleLogin}><i class="fa-solid fa-right-to-bracket"></i></button> 
                           
                <button id="register-button"><i class="fa-solid fa-user-plus"></i></button>            
            </div>
            
        </div>        
    );
}

