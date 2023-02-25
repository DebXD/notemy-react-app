import React, { useEffect, useState } from 'react';
import Login from './components/login';
import Notes from './components/notes'
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './components/about';
import Header from './components/header';
import NoteDetails from './components/noteDetails';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRef } from "react";

function App(){
  let accessToken = Cookies.get('AccessToken');
  let refreshToken = Cookies.get('RefreshToken');
  let navigate = useNavigate();

  let [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);


  const dataFetchedRef = useRef(false);
  const URL = "https://notemyapi-1-b7327629.deta.app/api/v1/"

  const isAuthenticated = () =>{
      if (accessToken | refreshToken === undefined){
          navigate('/login')
      }
  }
// FOR DELETING NOTE
  const Delete = async(id) => {
    let token = accessToken
            let config = {
                headers: {
                'Authorization' : 'Bearer ' + token
                }}
            try{
                console.log('processing delete')
                
                let response = await axios.delete(URL + "notes/" + id  + '/', config)
                //console.log(response)
                if (response.status === 204){
                  
                }
                //alert('your note is deleted')
                
              }
            catch (error) {
              alert("Failed to delete your note")
              console.log(error)
            }
}
  
  return(
    <div>
      <Header title={'Notemy'} searchBar={true}/>
      <Routes>
      
        <Route
          path="*"
          element={
            <>
            <Notes isAuthenticated={isAuthenticated}  apiurl={URL} />
            
            </>
          }
        />
        
        <Route path="/login" element={<Login apiurl={URL}/>} />
        <Route path="/details/:id/" element={<NoteDetails apiurl={URL} isAuthenticated={isAuthenticated}/>} />

        <Route path="/about" element={<About />} />
      </Routes>

    </div>
  )
  }
export default App;
