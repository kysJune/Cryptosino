import React, {useState} from 'react';
import {Header} from './components/Header/headerComponent';
import {Home} from './components/Home/homeComponent';
import { Login } from './components/Login/loginComponent';
import { Register } from './components/Register/registerComponent';
import { Footer } from './components/Footer/footerComponent';
import './App.css';

function App() {
  const  [page, setPage] = useState("Home");
  let pageComponent = page;
    if( page === "Home" ){
      pageComponent = <Home/>;
    }
    else if(page === "Login"){
      pageComponent = <Login/>;
    }
    else if(page === 'Register'){
      pageComponent = <Register/>;
    }

  return (
    <div className="App">
      <Header 
      handleLogin = {() =>{setPage("Login");}}
      goHome = {() =>{setPage("Home");}}
      handleRegister = {() => {setPage("Register")}}
      />
     {pageComponent}
        <Footer/>
    </div>
  );
}






export default App;
