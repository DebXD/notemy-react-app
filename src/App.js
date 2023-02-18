import React, { useEffect, useState } from 'react';
import Login from './components/login';
import Notes from './components/notes'
import { Route, Routes } from 'react-router-dom';
import About from './components/about';
function App(){

  
  return(
    <div>
      {/* <Login />
      <Notes/> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
            <Notes />
            
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </div>
  )
  }
export default App;
