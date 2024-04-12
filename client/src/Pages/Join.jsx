import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

let user = ''; // Initialize user as an empty string

function Join() {
  const [name, setName] = useState('');

  const handleclick = () => {
    if (name.trim() !== '') {
      user = name.trim(); // Update the user variable
    }
  };

  const handlechange = (e) => {
    setName(e.target.value);
  };

  const handlelink = (e) => {
    if (!name.trim()) {
      e.preventDefault();
      alert("Please Enter Name");
    }
  };

  return (
    <div className="container">
      <input type="text" placeholder="Enter name" id="name" onChange={handlechange} />
      <Link to="/chat" onClick={handlelink}>
        <button onClick={handleclick}>Join</button>
      </Link>
    </div>
  );
}

export default Join;
export { user }; // Export user here
