import React from "react";
import { useState } from "react";

function NoteItem(props) {
  const [title, setTitle] = useState(props.note.title)
  const [content, setContent] = useState(props.note.content)
  return (<>
    <div className="container">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  </>)
}

export default NoteItem;
