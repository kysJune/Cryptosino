import React from "react";
import "./login.css";


export let Login= () => {
    return (
        <div className="loginBox">
            <h1>Login</h1>
            <form action="./home" method="POST">
                <div>
                    <label id="emailLabel" for="emailField">email</label>
                    <input id="emailField" name="emailField" type="text"/>
                </div>
                <div>
                    <label id="passwordLabel" for="passwordField">password</label>
                    <input id="passwordField" type="text"/>
                </div>
                <button id="loginButton">Login</button>
            </form>
        </div>
    );
}