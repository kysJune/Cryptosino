import React, {useState} from 'react';
import {Header} from './components/Header/headerComponent';
import {Home} from './components/Home/homeComponent';
import { Login } from './components/Login/loginComponent';
import { Register } from './components/Register/registerComponent';
import { Footer } from './components/Footer/footerComponent';
import './App.css';
import { SlotMachine } from './components/Games/SlotMachine/slotMachineComponent';
import { pauseHomeMusic, playHomeMusic } from './appMusic';

function App() {

  //play home page music
  
  const  [page, setPage] = useState("Home");
  const [user, setUser] = useState({
    email: "",
    password: "",
    balance: 0,
    isLoggedIn: false,
  });
  let goToGame = (gameName) =>{

    setPage(gameName);
  }
  let pageComponent = page;
    if( page === "Home" ){
      pageComponent = <Home goToGame = {goToGame}/>;
    }
    else if(page === "Login"){
      pageComponent = <Login  goHome={() => {setPage("Home"); playHomeMusic(); }} logIn = {(newUser) => setUser(newUser)}/>;
    }
    else if(page === 'Register'){
      pageComponent = <Register goHome={() => {setPage("Home"); playHomeMusic();}} logIn = {(newUser) => {setUser(newUser); }}/>;
    }

    else if(page ==='Slot Machine'){
      pageComponent = <SlotMachine/>;
    }

  return (
    <div className="App">
      <Header 
      handleLogin = {() =>{setPage("Login");}}
      goHome = {() =>{setPage("Home"); playHomeMusic();}}
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
