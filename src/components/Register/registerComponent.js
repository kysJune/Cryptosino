
import React, {useState} from "react";
import "./register.css"
import { isValidCredentials } from "./registerLogic";
import Axios from "axios";
export let Register= (props) => {
    //state object that holds the current values in the form's input fields
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    //updates a field in the state object mentioned above 
    let handleChange = (e) =>{
        let temp = {...formValues};
        temp[e.target.id] = e.target.value;
        setFormValues(temp);
        console.log(formValues);
    }

    //submits the form data to the backend for further validation
    let  handleSubmit = async (e) =>{
        e.preventDefault();
        //validate the form values
        if(!isValidCredentials(formValues)){
            console.log("user entered invalid credentials");
            return;
        }
        //push the credentials to the backend 
        try {
            const response = await Axios.post(`${process.env.REACT_APP_BASEURL}/user/`, formValues );
            console.log(response);
          } catch (error) {
            console.error(error);
          }
    }
    
    return (
        <div className="registerBox">
            <h1>Register</h1>
            <form id="registration-form" onSubmit={(e) => handleSubmit(e)}>
                <div id="regis-email">
                    <label id="emailLabel" for="emailField">Email</label>
                    <input id="email" name="emailField" type="email" onChange={(e) => handleChange(e)} value={formValues.email} required/>
                </div>
                <div id="regis-password">
                    <label id="passwordLabel" for="passwordField">Password</label>
                    <input id="password" name="passwordField" type="password" onChange={(e) => handleChange(e)} value={formValues.password} required/>
                </div>
                <div id="regis-confirm-password">
                    <label id="passwordConfirmLabel" for="passwordConfirmField">Password Confirm</label>
                    <input id="confirmPassword" name="passwordConfirmField" type="password"  onChange={(e) => handleChange(e)} value={formValues.confirmPassword} required/>
                </div>
                <button id="registerButton" type="submit">Register</button>
                
            </form>
        </div>
    );
}