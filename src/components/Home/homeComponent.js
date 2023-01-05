
import React from 'react';
import {Footer} from '../Footer/footerComponent';
import { GameChoice } from '../GameChoice/gameChoiceComponent';
import { GameChoices } from '../GameChoices/gameChoicesComponents';

export let Home = () => {
    return(
        <div className="Home">
            
            <h1 id='home-title'>Games</h1>
            <GameChoices/>
        </div>        
    );
}