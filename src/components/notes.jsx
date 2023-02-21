import { React, useEffect} from "react"
import { useRef } from "react";
import NoteItem from "./noteItem";


const Notes = (props) => {
    const dataFetchedRef = useRef(false);
    

    useEffect(() =>{
        //don't run useEffect twice
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        
        props.isAuthenticated()
        props.getNotes()
        
              
        },[props])
    return (
        <div className="container ">
            <h2 className="d-flex justify-content-center">NOTES</h2>
            {props.loading === false ?
            (<ul className="list-group my-4">
            {props.notes.length===0  ?
             (<p>NO TODOS</p>) : 
            props.notes.map((note) => 
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