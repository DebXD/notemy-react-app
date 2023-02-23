import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const NoteDetails = (props) => {
    const [loading , setLoading] = useState()
    const {id} = useParams();

    const dataFetchedRef = useRef(false);
    useEffect(() => {
        //don't run useEffect twice
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const Run = async () => {
            setLoading(true)
            props.isAuthenticated()
           
            await props.getNote(id)
            setLoading(false)
            
        }
        Run()

    }, [id, props])
    const handleNoteUpdate = async(e) =>{
        e.preventDefault()
        if (props.title && props.content === ''){
            alert("Title and content can not be empty")
        }
        else{
            console.log(props.title, props.content)
            setLoading(true)
            await props.updateNote(id, props.title, props.content)
            setLoading(false)
        }
      }
    
    
    
    return (
    <>
    {loading === false ? (
        <div className="container">
            <form action="" onSubmit={handleNoteUpdate}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" value={props.title} onChange={(e) => {props.setTitle(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={props.content} onChange={(e) => {props.setContent(e.target.value)}}></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-outline-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg></button>
                <button className="btn btn-outline-danger m-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg></button>
            </div>
            </form> 
        </div>
     ) : (
        <div className="text-center mt-5">
  <div className="spinner-grow" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
     )}
    
    </>
    )
}

export default NoteDetails;