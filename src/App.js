import React, { useState } from 'react';
import Login from './components/login';
import Notes from './components/notes'
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './components/about';
import Header from './components/header';
import axios from 'axios'
import Cookies from 'js-cookie';

function App(){
  let accessToken = Cookies.get('AccessToken')
  let refreshToken = Cookies.get('RefreshToken')
  let navigate = useNavigate()

  let [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const isAuthenticated = () =>{
      if (accessToken | refreshToken === undefined){
          navigate('/login')
          console.log("no auth")
      }
  }
  const getNotes = async() =>{
    let token = accessToken
    let config = {
        headers: {
        'Authorization' : 'Bearer ' + token
        }}
    try{
        console.log('processing')
        let response = await axios.get('https://notemy-api.deta.dev/api/v1/notes/',config)

        let data = response.data


        let allNotes = []


        let firstPageNotes = data.data
        for(let i =0; i<firstPageNotes.length; i++){
          allNotes.push(firstPageNotes[i])
        }
        
        let meta = data.meta

        let pages = meta['pages']

        for (let page=2; page<pages+1; page++){
          let response = await axios.get('https://notemy-api.deta.dev/api/v1/notes/?page=' + page, config)
          let data = response.data
          let notes = data.data
          //console.log(notes)
          for (let i=0; i<5; i++){
            if (notes[i] !== undefined){
              allNotes.push(notes[i])
            }
           
            
            
           }

          


         }

        setNotes(allNotes)
        console.log(allNotes)
        setLoading(false)
        
        // increase the counter
        setCounter((oldValue) => oldValue+1);
    }
    catch{
        navigate('/login')

    }
}
  const Delete = async(id) => {
    let token = accessToken
            let config = {
                headers: {
                'Authorization' : 'Bearer ' + token
                }}
            try{
                console.log('processing delete')
                setLoading(true)
                let response = await axios.delete("https://notemy-api.deta.dev/api/v1/notes/" + id  + '/', config)
                //console.log(response)
                if (response.status === 204){
                  await getNotes()
                  setLoading(false)
                }
                //alert('your note is deleted')
                
              }
            catch{
              alert("Failed to delete your note")
            }
}
  
  return(
    <div>
      <Header title={'Notemy'} searchBar={true}/>
      <Routes>
      
        <Route
          path="/"
          element={
            <>
            
            <Notes isAuthenticated={isAuthenticated} Delete={Delete} getNotes={getNotes} notes={notes} loading={loading}/>
            
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
