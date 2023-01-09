import React from "react";
import "./userData.css";
export let UserData = (props) =>{
    return (
        <div id="user-data">
            <div className="container">
                <p id="user-email" className="user-data">{props.data.email}</p>
                <p id="user-balance" className="user-data">{`$${props.data.balance}`}</p>
            </div>
            <div className="container">
                <a href="">Settings</a>
                <button id="logout-button" className="user-button user-data">Logout</button>
            </div>
        </div>
    );
}
