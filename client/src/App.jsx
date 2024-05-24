import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/activities")
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to Fitness Tracker</h1>
      </header>
      <main className="main">
        <section className="form-section">
          <Form addActivity={addActivity} />
        </section>
        <section className="activitylist-section">
          <h2>Activity List</h2>
          <ul className="activitylist">
            {activities.map((activity, index) => (
              <li key={index} className="activity">
                <h3>{activity.type}</h3>
                <p>Duration: {activity.duration} minutes</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
