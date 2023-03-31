import { React, useEffect, useState } from "react";
import { useRef } from "react";
import NoteItem from "./noteItem";
import axios from "axios";
import AddNote from "./addNote";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";
import { useIsAuthenticated } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { ImSpinner } from "react-icons/im";
import { TbFidgetSpinner } from "react-icons/tb";

const Notes = (props) => {
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);
  const [notes, setNotes] = useState([]);
  //  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const token = auth().token;

  const searchNotes = async (query) => {
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
      notes.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      setNotes(notes);

      console.log(notes);
    } catch (e) {
      console.log(e.message);
      navigate("/login");
    }
    setLoading(false);
  };

  const debouncedSearch = useRef(
    debounce(async (query) => {
      await searchNotes(query);
    }, 300)
  ).current;

  function handleSearch(e) {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(query);
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
    <>
      <div className="search-container mx-3 my-3">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search keyword..."
            aria-label="Search"
            onKeyUp={(e) => handleSearch(e)}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </form>
      </div>
      <div className="m-3">
        <AddNote
          apiurl={props.apiurl}
          loading={loading}
          setLoading={setLoading}
          getNotes={searchNotes}
        />
        <h2 className="text-center text-3xl font-semibold mb-5">NOTES</h2>

        {loading === false ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {notes.length === 0 ? (
              <h4 className="text-center text-muted">Add a Note...</h4>
            ) : (
              notes.map((note) => {
                return <NoteItem note={note} key={note.id} />;
              })
            )}
          </ul>
        ) : (
          <div className="flex justify-center">
            <TbFidgetSpinner className="animate-spin h-6 w-6" />
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
