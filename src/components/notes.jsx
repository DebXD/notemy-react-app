import { React, useEffect, useState } from "react";
import { useRef } from "react";
import NoteItem from "./noteItem";
import axios from "axios";
import AddNote from "./addNote";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";

const Notes = (props) => {
  const [loading, setLoading] = useState(true);
  const dataFetchedRef = useRef(false);
  const [notes, setNotes] = useState([]);
  //  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    //? don't run useEffect twice

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const jwtToken = props.getJwtToken();
    if (props.isLoggedIn(jwtToken)) {
      debouncedSearch(query);
    } else {
      navigate("/login");
    }
  }, []);

  const searchNotes = async (query) => {
    let token = props.getJwtToken();
    console.log(token);
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

      console.log(notes);
    } catch (e) {
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
      <div className="container ">
        <AddNote
          apiurl={props.apiurl}
          loading={loading}
          setLoading={setLoading}
          getNotes={searchNotes}
        />
        <h2 className="d-flex justify-content-center">NOTES</h2>

        {loading === false ? (
          <ul className="list-group my-4">
            {notes.length === 0 ? (
              <h4 className="text-center text-muted">Add a Note...</h4>
            ) : (
              notes.map((note) => {
                return <NoteItem note={note} key={note.id} />;
              })
            )}
          </ul>
        ) : (
          <div className="text-center mt-5">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
