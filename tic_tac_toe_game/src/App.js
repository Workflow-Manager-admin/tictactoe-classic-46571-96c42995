import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110 }}>
          <h1 className="title" style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: 15, color: "#222222" }}>
            TicTacToe Classic
          </h1>
          <div style={{ marginBottom: 40, color: "#4caf50", fontWeight: 400, letterSpacing: 1 }}>
              A simple two-player tic-tac-toe game
          </div>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;