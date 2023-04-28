import { useQuery } from "react-query";
import axios from "axios";
import NoteItem from "./noteItem";
import { TbLoader2 } from "react-icons/tb";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { useState } from "react";
import useDebounce from "../utils/hooks/useDebounce";

interface Props {
  apiurl: string;
}
interface NoteTypes {
  id: number;
  title: string;
  content: string;
}

const Notes = ({ apiurl }: Props) => {
  const isAuthenticated = useIsAuthenticated();

  const auth = useAuthUser();
  const token = auth()?.token;
  const singOut = useSignOut();

  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([]);

  //const debouncedSearchQuery = useDebounce(query, 300);

  if (!isAuthenticated()) {
    singOut();
  }

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getNotes = async (debouncedSearchQuery: string) => {
    const res = await axios.get(
      `${apiurl}notes/search/?query=${debouncedSearchQuery}`,
      config
    );
    const data = await res?.data.data;
    setNotes(data);
    return data;
  };

  const useGetNotes = (debouncedSearchQuery: string) => {
    // Notice we only use `employees` as query key, because we want to preserve our cache
    return useQuery([notes, debouncedSearchQuery], async () => {
      await getNotes(debouncedSearchQuery);
    });
  };

  const { isLoading, data, isError, error } = useGetNotes(query);

  if (error instanceof Error) {
    console.log(error.message);
    alert(error.message);
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
          {/* <AddNote
        apiurl={props.apiurl}
        setLoading={setLoading}
        getNotes={searchNotes}
      /> */}
        </div>
        <h2 className="flex-grow mr-14 mt-2 text-center text-3xl font-['Bebas_Neue'] text-white">
          NOTES
        </h2>
      </div>

      {isLoading === false ? (
        <ul className="masonry sm:masonry-sm md:masonry-md mx-5">
          {notes.length === 0 ? (
            <h4 className="text-center  text-xl font-[Poppins] text-gray-400">
              Add a Note...
            </h4>
          ) : (
            notes.map((note: NoteTypes) => {
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

    // <>
    //   {data?.data.data.map((note: Item) => {
    //     return (
    //       <NoteItem
    //         id={note.id}
    //         title={note.title}
    //         content={note.content}
    //         key={note.id}
    //       />
    //     );
    //   })}
    // </>
  );
};

export default Notes;
