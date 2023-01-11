import React from "react";
import "./slotMachineLogic";
import "./slotMachine.css";

export let SlotMachine = () =>{
    return (
        <div className = "SlotMachine">
            <h1>Slot Machine</h1>
            <h2 id="slot-machine-jackpot">Current Jackpot: $5,000,000</h2>
            <div className="machine-holder">
                <p id="slot-machine-balance">balance: $500.43</p>
                <button id="start-slot-machine-button">
                    SPIN
                </button>
            </div>
            
        </div>
    );
}