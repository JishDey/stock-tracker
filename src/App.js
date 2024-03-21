import logo from './logo.svg';
import { useState } from 'react';
import GetStock from './GetStock';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          Hi!
        </p>
        <GetStock/>
      </header>
    </div>
  );
}

export default App;
