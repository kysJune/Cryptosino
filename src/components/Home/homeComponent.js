
import React from 'react';
import { BlinkingSquare } from '../BlinkingSquare/blinkingSquareComponent';
import {Footer} from '../Footer/footerComponent';
import { GameChoice } from '../GameChoice/gameChoiceComponent';
import { GameChoices } from '../GameChoices/gameChoicesComponents';
import "./home.css";
export let Home = () => {
    return(
        <div className="Home">
            <div className="blinking-holder">
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
            <GameChoices/>
        </div>        
    );
}