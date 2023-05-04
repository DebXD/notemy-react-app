import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import NoteItem from "./noteItem";
import { TbLoader2 } from "react-icons/tb";

import { useState } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import AddNote from "./addNote";
import { getNotes } from "../utils/api/api";

interface Props {
  apiurl: string;
}
interface NoteTypes {
  id: number;
  title: string;
  content: string;
}

const Notes = ({ apiurl }: Props) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const token = null;

  const [query, setQuery] = useState("");
  //const [notes, setNotes] = useState([]);

  //const debouncedSearchQuery = useDebounce(query, 300);

  // const useNotes = () => {
  //   return useQuery({
  //     queryKey: ["notes"],
  //     queryFn: async () => getNotes(token),
  //   });
  // };
  const { isLoading, data, isError, error, isSuccess } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => getNotes(token),
  });

  if (isError) {
    if (typeof error === "object" && error !== null) {
      if ("response" in error) {
        let res = error.response;
        if (typeof res === "object" && res !== null) {
          if ("status" in res) {
            console.log(res.status);
            if (res.status === 401) {
              singOut();
            }
          }
        }
      }
    }
  }
  return (
    <div className="bg-gray-900">
      <div className="search-container">
        <form role="search">
          <div className="mb-5 mx-5">
            <input
              className="w-full  p-2 bg-gray-800 rounded-3xl mt-20 text-white focus:bg-gray-700"
              type="search"
              placeholder="   Search keyword..."
              aria-label="Search"
              //onKeyUp={(e) => setQuery(e.target?.value)}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </form>
      </div>
      <div className="m-5 flex flex-row justify-center">
        <div className="text-left">
          {/* <AddNote apiurl={apiurl} setLoading={setLoading} /> */}
        </div>
        <h2 className="flex-grow mr-14 mt-2 text-center text-3xl font-['Bebas_Neue'] text-white">
          NOTES
        </h2>
      </div>

      {isSuccess || !isLoading ? (
        <ul className="masonry sm:masonry-sm md:masonry-md mx-5">
          {data.length === 0 ? (
            <h4 className="text-center  text-xl font-[Poppins] text-gray-400">
              Add a Note...
            </h4>
          ) : (
            data.map((note: NoteTypes) => {
              return (
                <NoteItem
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  key={note.id}
                />
              );
            })
          )}
        </ul>
      ) : (
        <div className="flex justify-center h-screen">
          <TbLoader2 className="animate-spin h-8 w-8 text-white" />
        </div>
      )}
    </div>
  );
};

export default Notes;
