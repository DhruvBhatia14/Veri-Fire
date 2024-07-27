import React from 'react';
import AlertsList from './components/alertList/AlertList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h2>Verifire Dashboard</h2>
      </header>
      <AlertsList />
    </div>
  );
}

export default App;