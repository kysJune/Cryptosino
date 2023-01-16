//header component 
import React from 'react';
import { pauseHomeMusic, playHomeMusic } from '../../appMusic';
import {Logo} from '../Logo/logoComponent';
import "./header.css";
import { HeaderLinks } from './headerLinksComponent';
import { UserData } from './userDataComponent';

export let Header = (props) =>{
   //either pauses or plays the background music for the home page 
   let handlePause = (e) =>{
    if(e.target.value == "pause"){
        pauseHomeMusic();
        e.target.value = "play";
        e.target.innerText = "Play Music";
    }
    else{
        playHomeMusic();
        e.target.value = "pause";
        e.target.innerText = "Pause Music";
    }
   }
    return(
        <div className="Header">
            
            <Logo handleClick={props.goHome}/>
            <button onClick={handlePause} value="pause">Pause Music</button>
            {(!props.isLoggedIn) ? <HeaderLinks handleLogin = {props.handleLogin} handleRegister = {props.handleRegister}/> :
             <UserData data={props.data}/>}
            
        </div>        
    );
}

