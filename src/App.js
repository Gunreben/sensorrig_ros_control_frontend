import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recording, setRecording] = useState(false);
  const [diskSpace, setDiskSpace] = useState({ total: 0, used: 0, free: 0 });
  const [diskPath, setDiskPath] = useState('/mnt');
  const cameraIPs = ['192.168.26.70', '192.168.26.71', '192.168.26.72', '192.168.26.73', '192.168.26.74', '192.168.26.75'];

  const toggleRecording = () => {
    const action = recording ? 'stop' : 'start';
    fetch(`http://192.168.26.4:5000/${action}`, {
      method: 'POST'
    }).then(() => setRecording(!recording));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`http://192.168.26.4:5000/disk-space?path=${encodeURIComponent(diskPath)}`)
        .then(response => response.json())
        .then(data => setDiskSpace(data))
        .catch(error => console.error('Error fetching disk space:', error));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [diskPath]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROS Image Viewer</h1>
        <button
          className={`record-button ${recording ? 'recording' : ''}`}
          onClick={toggleRecording}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <div className="camera-grid">
          {cameraIPs.map(ip => (
            <div key={ip} className="camera-feed">
              <h2>Camera {ip.slice(-2)}</h2>
              <img src={`http://${ip}:81/`} alt={`Camera feed from ${ip} not available`} />
            </div>
          ))}
        </div>
        <div className="disk-space">
          <h3>Disk Space:</h3>
          <div>Total: {diskSpace.total} GB, Used: {diskSpace.used} GB, Free: {diskSpace.free} GB</div>
        </div>
      </header>
    </div>
  );
}

export default App;

