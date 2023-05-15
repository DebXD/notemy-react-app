import { useState } from "react";
import Link from "next/link";

interface PropsTypes {
  id: number;
  title: string;
  content: string;
}
function NoteItem(props: PropsTypes) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  return (
    <li
      onClick={() => {
        <Link href={`/details/${props.id}/`}></Link>;
      }}
      className="break-inside mb-4 list-group-item  mx-4 md:mx-0 rounded-3xl bg-gray-800  border-y-4 border-x-4 border-y-indigo-400 border-x-violet-400 shadow-2xl md:basis-1/4 md:flex-1 hover: cursor-pointer hover:shadow-violet-900 transition duration-500 ease-in-out"
    >
      <div className="m-2 p-2">
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="text-white break-words">
          {content.length > 500 ? content.slice(0, 500) + "..." : content}
        </div>
      </div>
    </li>
  );
}

export default NoteItem;
