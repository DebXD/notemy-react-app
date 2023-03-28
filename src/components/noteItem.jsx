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
      <li className={`list-group-item bg-amber-200 mx-4 md:mx-0 rounded-xl`}>
        <div
          className="m-2 p-2"
          onClick={() => {
            navigate(`/details/${props.note.id}/`);
          }}
        >
          <div className="text-xl font-semibold text-black">{title}</div>
          <div className="text-black">{content}</div>
        </div>
      </li>
    </>
  );
}

export default NoteItem;
