import React from 'react'
import './Chat_area.css'
function Chat_area({user,message,classs}) {
  if(user){
    return (
      <div className={`messagebox ${classs}`}>
        <p>{`${user}: ${message}`}</p>
      </div>
    )
  }else{
    return (
    <div className={`messagebox ${classs}`}>
      <p>{`you: ${message}`}</p>
    </div>
  )
  }
}

export default Chat_area
