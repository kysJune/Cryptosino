//header component 
import React from 'react';
import {Logo} from '../Logo/logoComponent';
import "./header.css";
import { HeaderLinks } from './headerLinksComponent';
import { UserData } from './userDataComponent';

export let Header = (props) =>{
   
    return(
        <div className="Header">
            
            <Logo handleClick={props.goHome}/>
         
            {(!props.isLoggedIn) ? <HeaderLinks handleLogin = {props.handleLogin} handleRegister = {props.handleRegister}/> :
             <UserData data={props.data}/>}
            
        </div>        
    );
}

