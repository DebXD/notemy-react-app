import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import debounce from "lodash.debounce";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  const searchNotes = async (query) => {
    let accessToken = Cookies.get("AccessToken");
    let token = accessToken;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      props.setLoading(true);
      let response = await axios.get(
        `${props.apiurl}notes/search/?query=${query}`,
        config
      );
      let data = response.data;
      let notes = data.data;
      console.log(notes);
      props.setLoading(false);
      props.setNotes(notes);
    } catch {
      //alert("No Results Found");
      props.getNotes();
    }
  };

  function handleSearch(e) {
    e.preventDefault();
    setQuery(e.target.value);
    // console.log(props.query)
    if (query !== " " || query !== "") {
      const debounceSave = debounce(() => searchNotes(query), 1000);
      debounceSave();
    }
  }

  return (
    <div className="search-container mx-3 my-3">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search keyword..."
          aria-label="Search"
          onChange={(e) => {
            handleSearch(e);
          }}
          value={query}
        />
      </form>
    </div>
  );
};


export default SearchBar;
