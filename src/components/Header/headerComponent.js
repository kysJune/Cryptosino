//header component 
import React from 'react';
import {Logo} from '../Logo/logoComponent';
import "./header.css"

export let Header = (props) =>{
    return(
        <div className="Header">
            
            <Logo handleClick={props.goHome}/>

            <div id='header-links'>
                <button 
                    id="login-button" 
                    onClick={props.handleLogin}>
                    <i className="fa-solid fa-right-to-bracket">{"\nlogin"}</i>
                </button> 
                           
                <button 
                    id="register-button"
                    onClick={props.handleRegister}>
                    <i className="fa-solid fa-user-plus"></i></button>            
            </div>
            
        </div>        
    );
}

