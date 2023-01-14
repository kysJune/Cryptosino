import React from "react";
import "./slotMachineLogic";
import "./slotMachine.css";
import { Wheel } from "./wheelComponent";
import { startSpinning } from "./slotMachineLogic";
import { rotateOne } from "./slotMachineLogic";

export let SlotMachine = () =>{
    return (
        <div className = "SlotMachine">
            <h1>Slot Machine</h1>
            <h2 id="slot-machine-jackpot">Current Jackpot: $5,000,000</h2>
            <div className="machine-holder">
                <div id="wheels-holder">
                    <Wheel/>
                    <Wheel/>
                    <Wheel/>
                </div>
                <p id="slot-machine-balance">balance: $500.43</p>
                <button id="start-slot-machine-button" onClick={(e) =>{ startSpinning(e);  rotateOne("wheel1");}}>
                    SPIN
                </button>
            </div>
            
        </div>
    );
}