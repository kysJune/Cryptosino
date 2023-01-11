
import React from 'react';
import { BlinkingSquare } from '../BlinkingSquare/blinkingSquareComponent';
import { BorderTwinkle } from '../BorderTwinkle/borderTwinkleComponent';
import { GameChoices } from '../GameChoices/gameChoicesComponents';
import "./home.css";
export let Home = (props) => {
    return(
        <div className="Home">
            <BorderTwinkle/>
            <div className="blinking-holder">
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
             
            </div>
            <h1 id='home-title'>Games</h1>
            <GameChoices goToGame={props.goToGame}/>
           
            <div className="blinking-holder">
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
                <BlinkingSquare/>
            </div>
            <BorderTwinkle/>
        </div>        
    );
}