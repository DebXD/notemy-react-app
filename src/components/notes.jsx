import { React, useEffect, useState} from "react"
import { useRef } from "react";
import NoteItem from "./noteItem";
import {useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";
import AddNote from "./addNote";
import SearchBar from "./searchBar";



const Notes = (props) => {
    let accessToken = Cookies.get('AccessToken');
    const [loading, setLoading] = useState(true);
    const dataFetchedRef = useRef(false);
    const navigate = useNavigate();
    const [notes, setNotes] = useState([])
    const [count , setCount] = useState(0)
    const [query, setQuery] = useState()

    useEffect(() =>{
            //don't run useEffect twice
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            props.isAuthenticated()
            if (query === undefined){
              getNotes()
              console.log(notes)
            }
            else{

              
            }
              
        },[])

    const getNotes = async() =>{
        let token = accessToken
        let config = {
            headers: {
            'Authorization' : 'Bearer ' + token
            }}
        try{
            console.log('processing')
            let response = await axios.get(`${props.apiurl}notes/`,config)
    
            let data = await response.data
    
    
            let allNotes = []
    
    
            let firstPageNotes = data.data
            for(let i =0; i<firstPageNotes.length; i++){
              allNotes.push(firstPageNotes[i])
            }
            
            let meta = data.meta
    
            let pages = meta['pages']
    
            for (let page=2; page<pages+1; page++){
              let response = await axios.get(`${props.apiurl}notes/?page=` + page, config)
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
            console.log(allNotes)
            setLoading(false)
            
            // increase the counter
            setCount((oldValue) => oldValue+1);
        }
        catch (error) {
            navigate('/login')
            console.log(error)
    
        }
    }
    

    return (
      <>
      <SearchBar apiurl={props.apiurl} setNotes={setNotes} getNotes={getNotes} setLoading={setLoading}/>
        <div className="container ">
            <AddNote  apiurl={props.apiurl} loading={loading} setLoading={setLoading} getNotes={getNotes}/>
            <h2 className="d-flex justify-content-center">NOTES</h2>
            {loading === false ?
            (<ul className="list-group my-4">
            {notes.length===0  ?
             (<h4 className="text-center text-muted">Add a Note...</h4>) : 
            notes.map((note) => 
                {
                return(
                  
                <NoteItem note={note} key={note.id}/>
                )}
                )}
            </ul>)
      : (
        <div className="text-center mt-5">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
     )
    }


</div>
</>
    )
}

export default Notes;