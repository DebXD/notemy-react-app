import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
interface PropsTypes {
  id: number;
  title: string;
  content: string;
}
function NoteItem(props: PropsTypes) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  return (
    <motion.div
      animate={{ scale: 1 }}
      transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <li className="break-inside mb-4 list-group-item  mx-1 md:mx-1 rounded-3xl bg-gray-800  border-y-4 border-x-4 border-y-indigo-400 border-x-violet-400 shadow-2xl md:basis-1/4 md:flex-1 hover: cursor-pointer hover:shadow-violet-900 transition duration-500 ease-in-out">
        <Link href={`note/${props.id}`}>
          <div className="m-2 p-2">
            <div className="text-xl font-semibold text-white">{title}</div>
            <div className="text-white break-words">
              {content.length > 500 ? content.slice(0, 500) + "..." : content}
            </div>
          </div>
        </Link>
      </li>
    </motion.div>
  );
}

export default NoteItem;
