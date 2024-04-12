import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from './Pages/Join'
import Chat from './Pages/Chat'

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Join />}/>
          <Route path="/chat" element={<Chat />}/>
         
        </Routes>
      </BrowserRouter>

  )
}

export default App
