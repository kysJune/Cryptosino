import React from "react";
import "./register.css"

export let Register= () => {
    return (
        <div className="registerBox">
            <h1>Register</h1>
            <form action="" method="POST">
                <div>
                    <label id="emailLabel" for="emailField">Email</label>
                    <input id="emailField" name="emailField" type="text"></input>
                </div>
                <div>
                    <label id="passwordLabel" for="passwordField">Password</label>
                    <input id="passwordField" name="passwordField" type="text"></input>
                </div>
                <div>
                    <label id="passwordConfirmLabel" for="passwordConfirmField">Password Confirm</label>
                    <input id="passwordConfirmField" name="passwordConfirmField" type="text"></input>
                </div>
            </form>
        </div>
    )
}