import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NoteItem(props) {
  const [title, setTitle] = useState(props.note.title)
  const [content, setContent] = useState(props.note.content)
  let navigate = useNavigate()
  return (<>
    <li className="list-group-item">
      <div className="my-2" onClick={() => {navigate(`/details/${props.note.id}/`)}}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      
      </li>


  </>)
}

export default NoteItem;
