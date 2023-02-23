import { React, useEffect, useState} from "react"
import { useRef } from "react";
import NoteItem from "./noteItem";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
    const dataFetchedRef = useRef(false);
    const navigate = useNavigate();
    const notes = props.notes;

    useEffect(() =>{
        // if (navigate.action !== 'POP') {
            //don't run useEffect twice
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            
            // const Run = async () => {
            //     await props.isAuthenticated()
            //     await props.getNotes()
                
            // }
            // Run()
            // setNotes(props.notes)
            console.log(notes)
        // }
              
        },[props, navigate, notes])
    return (
        <div className="container ">
            <h2 className="d-flex justify-content-center">NOTES</h2>
            {props.loading === false ?
            (<ul className="list-group my-4">
            {notes.length===0  ?
             (<p>NO TODOS</p>) : 
            notes.map((note) => 
                {
                return(
                <NoteItem note={note} key={note.id} Delete={props.Delete}/>
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
    )
}

export default Notes;