import React, { useState } from 'react';
import './App.css';

function App() {
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    setRecording(!recording);
    // Call the API to start/stop recording
    fetch(`http://192.168.26.4:5000/${recording ? 'stop' : 'start'}`, {
      method: 'POST'
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </header>
    </div>
  );
}

export default App;

