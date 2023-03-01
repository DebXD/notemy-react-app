import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";


const NoteDetails = (props) => {
    const [loading , setLoading] = useState()
    const {id} = useParams();
    const navigate = useNavigate();
    let accessToken = Cookies.get('AccessToken');

    const [title, setTitle] = useState("");
    //const [detailsLoading, setDetailsLoading] = useState(true);
    const [content, setContent] = useState("")
    const URL = props.apiurl
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        //don't run useEffect twice
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const Run = async () => {
            setLoading(true)
            props.isAuthenticated()
           
            await getNote(id)
            setLoading(false)
            
        }
        Run()

    }, [])
    
    const handleNoteUpdate = async(e) =>{
        e.preventDefault()
        if (title && content === ''){
            alert("Title and content can not be empty")
        }
        else{
            console.log(title, content)
            setLoading(true)
            await updateNote(id, title, content)
            setLoading(false)
        }
      }


      const getNote = async(id) => {
        let token = accessToken;
        let config = {
          headers: {
          'Authorization' : 'Bearer ' + token
          }}
          try {
            
            let response = await axios.get(`${URL}notes/${id}/`, config )
            let data = await response.data
            console.log(data)
            setTitle(data.title)
            setContent(data.content)
            
            
    
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
          alert('Your Note is not Updated!')
          
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
                    
                    let response = await axios.delete(URL + "notes/" + id  + '/', config)
                    //console.log(response)
                    if (response.status === 204){
                        navigate('/')
                        
                    }
                    //alert('your note is deleted')
                    
                    }
                catch (error) {
                    alert("Failed to delete your note")
                    console.log(error)
                }
            }

    return (
    <>
    {loading === false ? (
        <div className="container">
            <form action="" onSubmit={handleNoteUpdate}>
              <div className="mb-3">
              
                  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
              </div>
            
              <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" value={content} onChange={(e) => {setContent(e.target.value)}}></textarea>
              </div>
            </form> 
            <div className="text-center">
                <button type="submit" className="btn btn-outline-warning" onClick={(e)=> {
                                if (window.confirm("Do you really want to Update?")) {
                                    handleNoteUpdate(e)}}}>Update</button>
                <button type="button" className="btn btn-outline-danger m-3" onClick={() => {
                                if (window.confirm("Are you sure, You want to delete?")) {
                                    Delete(id);}}}>Delete</button>
            </div>
            
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