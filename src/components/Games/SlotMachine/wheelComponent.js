import React from "react";
import { wheelValues } from "./slotMachineLogic.js";
import "./slotMachine.css";

export let Wheel = (props) => {
    let index = 0;
    return (
        <div className="Wheel" id={`wheel-${props.wheelid}`}>
        { 
            wheelValues.map( (value) => {
                return (
                <div className="wheel-value" name={value.name} style={{backgroundImage: `url(${value.image})`}} key={index++} id={`wheel${index}`} position={value.position}>
            
                </div>
                );
        })
        }
        </div>
    );
}