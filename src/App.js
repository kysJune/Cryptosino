import React from 'react';
import {Header} from './components/Header/headerComponent';
import {Home} from './components/Home/homeComponent';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
    </div>
  );

}

export default App;
