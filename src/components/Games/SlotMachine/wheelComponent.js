import React from "react";
import { wheelValues } from "./slotMachineLogic.js";
import "./slotMachine.css";

export let Wheel = (props) => {
    let index = 0;
    return (
        <div className="Wheel">
       { 
            wheelValues.map( (value) => {
               return (
                <div className="wheel-value" name={value.name} style={{backgroundImage: `url(${value.image})`}} key={index++}>
               
                </div>
                );
        })
        }
        </div>
    );
}