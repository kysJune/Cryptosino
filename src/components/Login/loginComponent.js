import React from "react";
import "./login.css";


export let Login= () => {
    return (
        <div className="loginBox">
            <h1>Login</h1>
            <form action="../../login" method="POST">
                <div>
                    <label id="emailLabel" for="emailField">email</label>
                    <input id="emailField" name="email" type="email"/>
                </div>
                <div>
                    <label id="passwordLabel" for="passwordField">password</label>
                    <input id="password" name="password" type="password"/>
                </div>
                <button id="loginButton">Login</button>
            </form>
        </div>
    );
}