import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      console.log('Here is the location:', location);
    }
  }, [location]);

  return (
    <div className="App">
      <header className="header">
        <h1>Veri-fire Dashboard</h1>
      </header>
      <main className="dashboard">
        <Card title="Card 1" content={`Current Location: ${location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : 'Fetching location...'}`} />
        <Card title="Card 2" content="This is the content for card 2." />
        <Card title="Card 3" content="This is the content for card 3." />
        {/* Add more Card components as needed */}
      </main>
    </div>
  );
}

export default App;