import React, {useState} from "react";
import "./login.css";
import axios from "axios";

export let Login= (props) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    let handleSubmit = async (e) =>{
        e.preventDefault();
        //push the credentials to the backend 
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/user/login`, {params: {email: data.email, password: data.password} } );
            console.log(response); // {success: true}
            if(response.data.success === true){
                props.logIn({email: response.data.userEmail, password: response.data.userPassword, isLoggedIn: true,  balance: response.data.userBalance});
                props.goHome();
            }
          } catch (error) {
            console.error(error);
          }
    };
    let handleChange = (e) =>{
        let temp = {...data};
        temp[e.target.name] = e.target.value;
        setData(temp);
        console.log(data);
    }
    return (
        <div className="loginBox">
            <h1>Login</h1>
            <form id="login-form" onSubmit={(e) =>handleSubmit(e)}>
                <div>
                    <label id="emailLabel" htmlFor="emailField">email</label>
                    <input id="emailField" name="email" type="email" onChange={(e) => {handleChange(e)}} value={data.email} required/>
                </div>
                <div>
                    <label id="passwordLabel" htmlFor="passwordField">password</label>
                    <input id="password" name="password" type="password" onChange={(e) => {handleChange(e)}} value={data.password} required/>
                </div>
                <button id="loginButton" type="submit">Login</button>
            </form>
        </div>
    );
}