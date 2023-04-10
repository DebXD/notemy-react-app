import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NoteItem(props) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);
  let navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/details/${props.note.id}/`);
      }}
      className={`list-group-item  mx-4 md:mx-0 rounded-3xl bg-gray-800 border-r-2 border-y-2 border-y-gray-400 border-r-gray-300 shadow-xl md:basis-1/4 md:flex-1`}
    >
      <div className="m-2 p-2">
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="text-white">{content}</div>
      </div>
    </li>
  );
}

export default NoteItem;
