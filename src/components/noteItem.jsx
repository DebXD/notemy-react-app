import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NoteItem(props) {
  const [title, setTitle] = useState(props.note.title)
  const [content, setContent] = useState(props.note.content)
  let navigate = useNavigate()
  return (<>
    <li className="list-group-item" >
      <div className="my-2" onClick={() => {navigate(`/details/${props.note.id}/`)}}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      
      


      <button
        className="btn btn-outline-danger mb-3"
        onClick={() => {
          if (window.confirm("Are you sure, You want to delete?")) {
            props.Delete(props.note.id);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
        </svg>
      </button>
      </li>
  </>)
}

export default NoteItem;
