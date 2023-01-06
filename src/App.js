import React, {useState} from 'react';
import {Header} from './components/Header/headerComponent';
import {Home} from './components/Home/homeComponent';
import { Login } from './components/Login/loginComponent';
import { Register } from './components/Register/registerComponent';
import { Footer } from './components/Footer/footerComponent';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
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

  return (
    <div className="App">
      <Header 
      handleLogin = {() =>{setPage("Login");}}
      goHome = {() =>{setPage("Home");}}
      />
     {pageComponent}
      <form action="../../post" method="post" 
              className="form">
              <input type="text" name="message"/>
          <button type="submit">Connected?</button>
        </form>
        <Footer/>
    </div>
  );
}






export default App;
