import React, {useState} from 'react';
import {Header} from './components/Header/headerComponent';
import {Home} from './components/Home/homeComponent';
import { Login } from './components/Login/loginComponent';
import { Register } from './components/Register/registerComponent';
import { Footer } from './components/Footer/footerComponent';
import './App.css';

function App() {
  const  [page, setPage] = useState("Home");
  const [user, setUser] = useState({
    email: "",
    password: "",
    balance: 0,
    isLoggedIn: false,
  });

  let pageComponent = page;
    if( page === "Home" ){
      pageComponent = <Home/>;
    }
    else if(page === "Login"){
      pageComponent = <Login  goHome={() => {setPage("Home"); }} logIn = {(newUser) => setUser(newUser)}/>;
    }
    else if(page === 'Register'){
      pageComponent = <Register goHome={() => {setPage("Home");}} logIn = {(newUser) => {setUser(newUser); console.log(newUser);}}/>;
    }

  return (
    <div className="App">
      <Header 
      handleLogin = {() =>{setPage("Login");}}
      goHome = {() =>{setPage("Home");}}
      handleRegister = {() => {setPage("Register")}}
      isLoggedIn = {user.isLoggedIn}
      data = {user}
      />
     {pageComponent}
        <Footer/>
      </div>
  );
}






export default App;
