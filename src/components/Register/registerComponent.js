import e from "express";
import React, {useState} from "react";
import "./register.css"

export let Register= (props) => {
    //state object that holds the current values in the form's input fields
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    //updates a field in the state object mentioned above 
    let handleChange = (e) =>{
        setFormValues({
            ...formValues,
            [e.target.id] : e.target.value
        });
        console.log(formValues);
    }

    //submits the form data to the backend for further validation
    let handleSubmit = (e) =>{
        e.preventDefault();

    }
    
    return (
        <div className="registerBox">
            <h1>Register</h1>
            <form id="registration-form" onSubmit={(e) => handleSubmit(e)}>
                <div id="regis-email">
                    <label id="emailLabel" for="emailField">Email</label>
                    <input id="email" name="emailField" type="email" onChange={(e) => handleChange(e)} value={formValues.email}/>
                </div>
                <div id="regis-password">
                    <label id="passwordLabel" for="passwordField">Password</label>
                    <input id="password" name="passwordField" type="password" onChange={(e) => handleChange(e)} value={formValues.password}/>
                </div>
                <div id="regis-confirm-password">
                    <label id="passwordConfirmLabel" for="passwordConfirmField">Password Confirm</label>
                    <input id="confirmPassword" name="passwordConfirmField" type="password"  onChange={(e) => handleChange(e)} value={formValues.confirmPassword}/>
                </div>
                <button id="registerButton" type="submit">Register</button>
                
            </form>
        </div>
    );
}