import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'
let user

function Join() {
  const [name, setName] = useState('')
  const sendUser = () => {
    user = document.getElementById('name').value;

  }
  const handleclick = (e) => {
    sendUser()

  }
  const handlechange = (e) => {
    setName(e.target.value)
  }
  const handlelink = (e) => {
    !name ? e.preventDefault(alert("Please Enter Name")) : null
  }
  return (
    <div class="container">
      <input type="text" placeholder="Enter name" id="name" onChange={handlechange} />
      <a href="/chat" onClick={handlelink}><button onClick={handleclick}>Join</button></a>
    </div>
  )
}

export default Join
export { user }