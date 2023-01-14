import React from "react";
import "./slotMachineLogic";
import "./slotMachine.css";
import { Wheel } from "./wheelComponent";
import { spinAllWheels, startSpinningMusic } from "./slotMachineLogic";
import { rotateOne } from "./slotMachineLogic";

export let SlotMachine = () =>{
    return (
        <div className = "SlotMachine">
            <h1>Slot Machine</h1>
            <h2 id="slot-machine-jackpot">Current Jackpot: $5,000,000</h2>
            <div className="machine-holder">
                <div id="wheels-holder">
                    <Wheel wheelid="1" />
                    <Wheel wheelid="2"/>
                    <Wheel wheelid="3"/>
                </div>
                <p id="slot-machine-balance">balance: $500.43</p>
                <button id="start-slot-machine-button" onClick={(e) =>{ spinAllWheels(e);}}>
                    SPIN
                </button>
            </div>
            
        </div>
    );
}