import React from "react";
import "./header.css";
export let HeaderLinks = (props) =>{
    return (
        <div id='header-links'>
                <button 
                    id="login-button" 
                    onClick={props.handleLogin}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                </button> 
                           
                <button 
                    id="register-button"
                    onClick={props.handleRegister}>
                    <i className="fa-solid fa-user-plus"></i></button>            
            </div>
    );
}