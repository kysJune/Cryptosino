// Game Choice component 

import React from 'react';
import "./gameChoice.css";

export let GameChoice = (props) =>{
    return(
        <div className="GameChoice"  onClick={()=>{props.goToGame(props.title); }}>
            <h2>{props.title}</h2>
            <img src={props.pictureUrl} alt='oof, no picture'></img>
            <p>{props.description}</p>
        </div>        
    );
}