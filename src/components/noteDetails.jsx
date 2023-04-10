import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { TbLoader2 } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const NoteDetails = (props) => {
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const token = auth().token;

  const signOut = useSignOut();

  const isAuthenticated = useIsAuthenticated();

  const [title, setTitle] = useState("");
  //const [detailsLoading, setDetailsLoading] = useState(true);
  const [content, setContent] = useState("");
  const URL = props.apiurl;
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    //don't run useEffect twice
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const Run = async () => {
      setLoading(true);
      await getNote(id);
      setLoading(false);
    };

    if (isAuthenticated()) {
      Run();
    } else {
      signOut();
      navigate("/login");
    }
  }, [isAuthenticated, signOut, navigate]);

  const handleNoteUpdate = async (e) => {
    e.preventDefault();
    if (title && content === "") {
      alert("Title and content can not be empty");
    } else {
      //console.log(title, content);
      setLoading(true);
      await updateNote(id, title, content);
      setLoading(false);
    }
  };

  const getNote = async (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      let response = await axios.get(`${URL}notes/${id}/`, config);
      let data = await response.data;
      //console.log(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      //console.log(error);
      alert("sorry this note details are not available");
      navigate("/");
    }
  };

  const updateNote = async (id, title, content) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let body = {
      title: title,
      content: content,
    };

    try {
      let response = await axios.patch(`${URL}notes/${id}/`, body, config);
      //console.log(response);
    } catch (error) {
      alert("Your Note is not Updated!");
    }
  };
  const Delete = async (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      //console.log("processing delete");

      let response = await axios.delete(URL + "notes/" + id + "/", config);
      //console.log(response)
      if (response.status === 204) {
        navigate("/");
      }
      //alert('your note is deleted')
    } catch (error) {
      alert("Failed to delete your note");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 h-screen mt-20">
      {loading === false ? (
        <div className="justify-center">
          <form onSubmit={handleNoteUpdate}>
            <div className="m-5">
              <label className="mt- flex text-xl mb-3 font-['Bebas_Neue'] text-white">
                Title
              </label>
              <input
                className="rounded-md border-2 p-2 w-full bg-gray-800 text-white"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="m-5">
              <label className="flex text-xl mb-3 font-['Bebas_Neue'] text-white">
                Content
              </label>
              <textarea
                className="rounded-md border-2 p-3 w-full bg-gray-800 text-white"
                rows="10"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-[Poppins] mt-2 rounded-md px-3.5 py-1.5 bg-yellow-700  text-base  leading-7 text-white hover:bg-yellow-600 m-2 inline-flex"
              onClick={(e) => {
                if (window.confirm("Do you really want to Update?")) {
                  handleNoteUpdate(e);
                }
              }}
            >
              <RxUpdate className="h-6 w-6 mt-1 mr-1" />
              Update
            </button>

            <button
              type="button"
              className="font-[Poppins] mt-2 rounded-md bg-red-700 px-3.5 py-1.5 text-base  leading-7 text-white hover:bg-red-500 m-2 flex"
              onClick={() => {
                if (window.confirm("Are you sure, You want to delete?")) {
                  Delete(id);
                }
              }}
            >
              <MdDelete className="h-6 w-6 mt-1 mr-1" /> Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20">
          <TbLoader2 className="animate-spin h-8 w-8 text-white" />
        </div>
      )}
    </div>
  );
};

export default NoteDetails;