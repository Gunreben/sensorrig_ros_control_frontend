import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [recording, setRecording] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [diskSpace, setDiskSpace] = useState({ total: 0, used: 0, free: 0 });
  const [diskPath, setDiskPath] = useState('/mnt');

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
    }, 1000);  // fetch disk space every second
    return () => clearInterval(intervalId);
  }, [diskPath]);

  useEffect(() => {
    const imageFetchInterval = setInterval(() => {
      fetch('http://192.168.26.70:8554/jpeg')
        .then(response => response.blob())
        .then(imageBlob => {
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectURL);
        })
        .catch(error => console.error('Error fetching image:', error));
    }, 1000);  // fetch image every second
    return () => clearInterval(imageFetchInterval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROS Image Viewer</h1>
        <div>
            <h1>Live Image Feed</h1>
            <img src="http://192.168.26.74:81/" alt="Not available. Only working if camera in http mode." />
        </div>
        <button onClick={toggleRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <div>
          <h3>Disk Space:</h3>
          <div>Total: {diskSpace.total} GB, Used: {diskSpace.used} GB, Free: {diskSpace.free} GB</div>
        </div>
      </header>
    </div>
  );
}

export default App;
