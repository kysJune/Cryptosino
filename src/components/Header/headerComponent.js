//header component 
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { pauseHomeMusic, playHomeMusic } from '../../appMusic';
import {Logo} from '../Logo/logoComponent';
import "./header.css";
import { HeaderLinks } from './headerLinksComponent';
import { UserData } from './userDataComponent';
axios.defaults.withCredentials = true; //allows the use of express sessions

export let Header = (props) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    //check if the user is logged in 
    useEffect(() =>{
         axios.get(`${process.env.REACT_APP_BASEURL}/loginStatus`).then(response => response.data).then(
            (result) => {
                console.log("The result of the axios is: " + result.isLoggedIn);

                setIsLoggedIn(result.isLoggedIn);
                setUserData(...result.userData);
            } 
          )
    });
  

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
            {(!isLoggedIn) ? <HeaderLinks handleLogin = {props.handleLogin} handleRegister = {props.handleRegister}/> :
             <UserData data={userData}/>}
            
        </div>        
    );
}

