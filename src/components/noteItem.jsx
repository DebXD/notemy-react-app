import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NoteItem(props) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);
  let navigate = useNavigate();

  return (
    <>
      {}
      <li
        className={`list-group-item  mx-4 md:mx-0 rounded-xl border-yellow-500 border-2 shadow-xl md:basis-1/4 md:flex-1`}
      >
        <div
          className="m-2 p-2"
          onClick={() => {
            navigate(`/details/${props.note.id}/`);
          }}
        >
          <div className="text-xl font-semibold text-white">{title}</div>
          <div className="text-white">{content}</div>
        </div>
      </li>
    </>
  );
}

export default NoteItem;
