import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';

const SearchBar = (props) => {
    const [query, setQuery] = useState("")

    const searchNotes = async(query) => {
        let accessToken = Cookies.get('AccessToken');
        let token = accessToken
          let config = {
              headers: {
              'Authorization' : 'Bearer ' + token
              }}
          try{
              props.setLoading(true)
              let response = await axios.get(`${props.apiurl}notes/search/?query=${query}`, config)
              let data = response.data
              let notes = data.data
              console.log(notes)
              props.setLoading(false)
              props.setNotes(notes)

          }
        catch{
            alert("No Results Found")
            props.getNotes()
  
        }
      }

      function handleSearch(e){
        e.preventDefault()
        // console.log(props.query)
        searchNotes(query)
    
      }

    return (
        <div className='search-container mx-3 my-3'>
        <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search keyword..."
          aria-label="Search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="btn btn-outline-info" type="submit" >
          Search
        </button>
      </form>
      </div>
    )
}


export default SearchBar;
