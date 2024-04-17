import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Viewer from './Viewer';
import Debug from './Debug';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/">Viewer</Link>
          <Link to="/debug">Debug</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Viewer />} />
          <Route path="/debug" element={<Debug />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

