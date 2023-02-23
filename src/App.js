import React, { useEffect, useState } from 'react';
import Login from './components/login';
import Notes from './components/notes'
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './components/about';
import Header from './components/header';
import AddNote from './components/addNote';
import NoteDetails from './components/noteDetails';
import axios from 'axios'
import Cookies from 'js-cookie';

function App(){
  let accessToken = Cookies.get('AccessToken');
  let refreshToken = Cookies.get('RefreshToken');
  let navigate = useNavigate();

  let [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const [titleDetail, setTitleDetail] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [contentDetail, setContentDetail] = useState("")

  const URL = "https://notemyapi-1-b7327629.deta.app/api/v1/"
const isAuthenticated = () =>{
      if (accessToken | refreshToken === undefined){
          navigate('/login')
          console.log("no auth")
      }
  }

  useEffect(() => {
    isAuthenticated()
    getNotes()
  }, [])
  // FOR GETTING NOTES
  const getNotes = async() =>{
    let token = accessToken
    let config = {
        headers: {
        'Authorization' : 'Bearer ' + token
        }}
    try{
        console.log('processing')
        let response = await axios.get(URL + 'notes/',config)

        let data = await response.data


        let allNotes = []


        let firstPageNotes = data.data
        for(let i =0; i<firstPageNotes.length; i++){
          allNotes.push(firstPageNotes[i])
        }
        
        let meta = data.meta

        let pages = meta['pages']

        for (let page=2; page<pages+1; page++){
          let response = await axios.get(URL + 'notes/?page=' + page, config)
          let data = await response.data
          let notes = data.data
          //console.log(notes)
          for (let i=0; i<5; i++){
            if (notes[i] !== undefined){
              allNotes.push(notes[i])
            }
           }
         }
        setNotes(allNotes)
        //console.log(allNotes)
        setLoading(false)
        
        // increase the counter
        setCounter((oldValue) => oldValue+1);
    }
    catch (error) {
        navigate('/login')
        console.log(error)

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
                  await getNotes()
                  
                }
                //alert('your note is deleted')
                
              }
            catch (error) {
              alert("Failed to delete your note")
              console.log(error)
            }
}
//  FOR ADDING NOTE
  const addNote = async(title, content) => {
    let token = accessToken;
    let config = {
      headers: {
      'Authorization' : 'Bearer ' + token
      }}
    let body = {
      title : title,
      content : content
    }
    try{
      setLoading(true)
      let response = await axios.post(URL + 'notes/', body, config)
      console.log(response)
      await getNotes()
      setLoading(false)

    }
    catch{
      alert('failed to add your note')
    }
     
  }
  const getNote = async(id) => {
    let token = accessToken;
    let config = {
      headers: {
      'Authorization' : 'Bearer ' + token
      }}
      try {
        
        let response = await axios.get(URL + 'notes/' + id + "/", config )
        let data = await response.data
        console.log(data)
        setTitleDetail(data.title)
        setContentDetail(data.content)
        
        

      } catch (error) {
        alert('sorry this note details are not available')
        navigate('/')
      }

  }

  const updateNote = async(id, title, content) => {
    let token = accessToken;
    let config = {
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    }
    let body = {
      title : title,
      content : content
    }

    try { 
      let response = await axios.patch( `${URL}notes/${id}/`, body, config)
      console.log(response)
      
    } catch (error) {
      alert('your note is not updated')
      
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
            <AddNote addNote={addNote}/>
            <Notes isAuthenticated={isAuthenticated} Delete={Delete} notes={notes} loading={loading} getNotes={getNotes}/>
            
            </>
          }
        />
        
        <Route path="/details/:id/" element={<NoteDetails isAuthenticated={isAuthenticated} getNote={getNote} title={titleDetail} content={contentDetail} setTitle={setTitleDetail} setContent={setContentDetail} updateNote={updateNote}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </div>
  )
  }
export default App;
