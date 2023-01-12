
import React, {useState} from "react";
import "./register.css"
import { isValidCredentials } from "./registerLogic";
import axios from "axios";

export let Register = (props) => {
    //state object that holds the current values in the form's input fields
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    //updates a field in the state object mentioned above 
    let handleChange = (e) =>{
        let temp = {...data};
        temp[e.target.id] = e.target.value;
        setData(temp);
        console.log(data);
    }

    //submits the form data to the backend for further validation
    //and subsequent injection into user table
    let handleSubmit = async (e) =>{
        e.preventDefault();
        //validate the form values
        if(!isValidCredentials(data)){
            console.log("user entered invalid credentials");
            return;
        }
        //push the credentials to the backend 
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/user/register`, {email: data.email, password: data.password} );
            console.log(response); // {success: true}
            if(response.data.success === true){
                props.logIn({email: response.data.userEmail, password: response.data.userPassword, isLoggedIn: true, balance: response.data.userBalance});
                props.goHome();
            }
          } catch (error) {
            console.error(error);
          }
    }
    
    return (
        <div className="registerBox">
            <h1>Register</h1>
            <form id="registration-form" onSubmit={(e) => handleSubmit(e)}>
                <div id="regis-email">
                    <label id="emailLabel" htmlFor="emailField">Email</label>
                    <input id="email" name="emailField" type="email" onChange={(e) => handleChange(e)} value={data.email} required/>
                </div>
                <div id="regis-password">
                    <label id="passwordLabel" htmlFor="passwordField">Password</label>
                    <input id="password" name="passwordField" type="password" onChange={(e) => handleChange(e)} value={data.password} required/>
                </div>
                <div id="regis-confirm-password">
                    <label id="passwordConfirmLabel" htmlFor="passwordConfirmField">Password Confirm</label>
                    <input id="confirmPassword" name="passwordConfirmField" type="password"  onChange={(e) => handleChange(e)} value={data.confirmPassword} required/>
                </div>
                <button id="registerButton" type="submit">Register</button>
                
            </form>
        </div>
    );
}