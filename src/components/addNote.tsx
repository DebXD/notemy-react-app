import React, { useState } from "react";
import axios from "axios";
import { useIsAuthenticated } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { HiDocumentAdd } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

interface Props {
  apiurl : string;
  setLoading : React.Dispatch<React.SetStateAction<boolean>>;
  getNotes : Function;
   
}

const AddNote = (props: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const auth = useAuthUser();
  const token = auth()?.token;

  const isAuthenticated = useIsAuthenticated();

  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated()) {
      if (title &&  content === "") {
        alert("Title and content can not be empty");
      } else {
        console.log(title, content);
        addNote(title, content);
        if (true) {
          setTitle("");
          setContent("");
        }

        handleModal();
      }
    } else {
      navigate("/");
    }
  };

  const addNote = async (title: string, content: string) => {
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
      props.setLoading(true);
      let response = await axios.post(`${props.apiurl}notes/`, body, config);
      console.log(response);
      await props.getNotes("");
      props.setLoading(false);
    } catch {
      alert("failed to add your note");
    }
  };

  return (
    <div className="mt-2">
      <HiDocumentAdd
        className="h-10 w-10 text-gray-200 hover:text-gray-500"
        onClick={handleModal}
      />

      {openModal ? (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm">
          <div className="flex items-center justify-center">
            <div className=" bg-gray-900 rounded-xl p-5 w-full m-2 md:w-4/6">
              <div className="text-center justify-between flex">
                <div className="text-center inline-block">
                  <p className="text-white font-semibold text-xl p-2 justify-between">
                    ADD NOTE
                  </p>
                </div>
                <span className=" text-white inline-block">
                  <div>
                    <IoClose
                      className="h-7 w-7 cursor-pointer"
                      onClick={handleModal}
                    />
                  </div>
                </span>
              </div>
              <hr />

              <form onSubmit={handleSubmit}>
                <div className="">
                  <label className="block text-white m-1">TITLE</label>
                  <input
                    type="text"
                    className="border rounded-md w-full m-1 p-2 bg-gray-800 text-white"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-white m-1">DESCRIPTION</label>
                  <textarea
                    className="border rounded-md w-full m-1 p-2 bg-gray-800 text-white"
                    rows={5}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div
                  className="
                justify-center flex"
                >
                  <button
                    onClick={handleSubmit}
                    className="text-center mt-2 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddNote;
