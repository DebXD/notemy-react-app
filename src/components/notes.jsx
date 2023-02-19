import { useState, React, useEffect} from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import NoteItem from "./noteItem";


const Notes = () => {
    let accessToken = Cookies.get('AccessToken')
    let refreshToken = Cookies.get('RefreshToken')
    let navigate = useNavigate()

    let [notes, setNotes] = useState("")
    const isAuthenticated = () =>{
        if (accessToken | refreshToken === undefined){
            navigate('/login')
            console.log("no auth")
        }
    }
    const [counter, setCounter] = useState(0);
    const dataFetchedRef = useRef(false);
    
    useEffect(() =>{
        // don't run useEffect twice
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        isAuthenticated()
        getNotes()      
        },[])


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
                let notes = data.data
                console.log(notes)
                setNotes(notes)
                // increase the counter
                setCounter((oldValue) => oldValue+1);
            }
            catch{
                navigate('/login')
    
            }
        }
    
    
    return (
        
        <>

        <div className="container">
            <h2 className="text-center">Your Notes</h2>
            <ul>
            {notes.length===0  ? <p>NO TODOS</p> : (
      notes.map((note) => {
        return (
            <NoteItem note={note} key={note.id} />
        );
      }))
      }
            </ul>
            
            

            

        </div>
        </>
    )
}

export default Notes;