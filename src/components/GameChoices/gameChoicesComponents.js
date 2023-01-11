// Game Choices component 

import React from 'react';
import { choices } from './gameChoicesLogic';
import { GameChoice } from '../GameChoice/gameChoiceComponent';
import "./gameChoices.css";

export let GameChoices = (props) =>{
    let index = 0;
    return(
        <div className="GameChoices">
            {
                choices.map((game, index) => {
                    
                    return <GameChoice 
                                key={index} 
                                title={game.title} 
                                description={game.description}
                                pictureUrl={game.pictureUrl}
                                goToGame={props.goToGame}
                            />
                    index++;
                })
            }
        </div>        
    );
}