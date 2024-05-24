import React, { useState } from 'react';

function Form({ addActivity }) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const createActivity = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ type, duration });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:3000/activities", requestOptions);
      const result = await response.json();
      console.log(result);
      alert("We successfully added your activity!");
      addActivity(result);
      setType("");
      setDuration("");
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <form className="form" onSubmit={createActivity}>
      <h2>Add a New Activity</h2>
      <label>
        Type
        <input type="text" onChange={handleTypeChange} value={type} required />
      </label>
      <label>
        Duration (minutes)
        <input type="number" onChange={handleDurationChange} value={duration} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
