import {useEffect, useState } from "react";
import { useRef } from "react";
import NoteItem from "./noteItem";
import axios from "axios";
import AddNote from "./addNote";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { TbLoader2 } from "react-icons/tb";

interface Props{
  apiurl: string;
}
const Notes = (props : Props) => {
  const [loading, setLoading] = useState(false);
  const dataFetchedRef = useRef(false);
  const [notes, setNotes] = useState<any[]>([]);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  
  const auth = useAuthUser();
  const token = auth()?.token;

  const singOut = useSignOut();

  const searchNotes = async (query: string) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    setLoading(true);
    try {
      let response = await axios.get(
        `${props.apiurl}notes/search/?query=${query}`,
        config
      );

      let data = response.data;
      let notes = data.data;
      setNotes(notes);
    } catch (e : any) {
      if (e.response.status === 404) {
        alert("No Result Found!");
        //setQuery("");
      } else {
        singOut();
        navigate("/login");
      }
    }
    setLoading(false);
  };

  const debouncedSearch = useRef(
    debounce(async (query) => {
      await searchNotes(query);
    }, 300)
  ).current;

  function handleSearch(e: React.KeyboardEvent) {
    e.preventDefault();
    setQuery((e.target as HTMLInputElement).value);
    //console.log(query);
    debouncedSearch(query);
  }
  useEffect(() => {
    //? don't run useEffect twice
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (isAuthenticated()) {
      debouncedSearch(query);
    } else {
      navigate("/login");
    }
  }, [navigate, query, debouncedSearch, isAuthenticated]);

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
              onKeyUp={(e) => handleSearch(e)}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </form>
      </div>
      <div className="m-5 flex flex-row justify-center">
        <div className="text-left">
        <AddNote
          apiurl={props.apiurl}
          setLoading={setLoading}
          getNotes={searchNotes}
        />
        </div>
        <h2 className="flex-grow mr-14 mt-2 text-center text-3xl font-['Bebas_Neue'] text-white">
          NOTES
        </h2>
        </div>
        

        {loading === false ? (
          <ul className="masonry sm:masonry-sm md:masonry-md mx-5">
            {notes.length === 0 ? (
              <h4 className="text-center  text-xl font-[Poppins] text-gray-400">Add a Note...</h4>
            ) : (
              notes.map((note) => {
                return <NoteItem id={note.id} title={note.title} content={note.content} key={note.id} />;
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
