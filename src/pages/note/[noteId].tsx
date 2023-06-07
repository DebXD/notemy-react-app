import React, { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useRouter } from "next/router";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { gmtToIst } from "@/utils/convertTimeZone/gmtToIst";
import { IoClose } from "react-icons/io5";

const NoteDetails = () => {
  const router = useRouter();
  const noteId = router.query.noteId;
  const axiosAuth = useAxiosAuth();
  const queryclient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const { status, data: session } = useSession();

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isError, error, isFetched } = useQuery({
    queryKey: ["note", noteId, session],
    queryFn: async () => {
      if (noteId) {
        const res = await axiosAuth.get(`/notes/${noteId}/`);
        console.log(res.data);
        if (res.data) {
          setTitle(res.data.title);
          setContent(res.data.content);

          const d = new Date();
          let diff = d.getTimezoneOffset();
          console.log(typeof diff);
          if (diff === -330) {
            console.log(res.data.createdAt);
            setCreatedAt(gmtToIst(res.data.created_at));
            if (res.data.updated_at) {
              setUpdatedAt(gmtToIst(res.data.updated_at));
            }
          }
        }
        return res.data;
      }
    },
  });

  if (isError) {
    if (typeof error === "object" && error !== null) {
      if ("message" in error) {
        console.log(error.message);
        console.log(data.config);
      }
    }
  }

  const { mutate } = useMutation({
    onSuccess: () => {
      queryclient.removeQueries();
    },
    mutationFn: async () => {
      if (noteId && session?.user) {
        const res = await axiosAuth.patch(`/notes/${noteId}/`, {
          title: title,
          content: content,
        });
        return res.data;
      }
    },
  });

  const handleNoteUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content === "") {
      alert("Title and content can not be empty");
    } else {
      mutate();
    }
  };

  const deleteNote = useMutation({
    onSuccess: () => {
      queryclient.removeQueries("notes");
    },
    mutationFn: async () => {
      if (noteId && session?.user) {
        const res = await axiosAuth.delete(`/notes/${noteId}/`);
        router.push("/");
        return res.data;
      }
    },
  });

  return (
    <div className="md:mt-18 mt-14 p-3 bg-gray-900">
      {data && isFetched ? (
        <div className="justify-center">
          <form onSubmit={handleNoteUpdate}>
            <div className="m-5">
              <label className=" flex text-xl mb-3 font-bebas text-white">
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

            <div className="mx-5 mt-5 mb-0">
              <label className="flex text-xl mb-3 font-bebas text-white">
                Content
              </label>
              <textarea
                className="rounded-md border-2 p-3 w-full bg-gray-800 text-white"
                rows={15}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="flex justify-center my-2">
              {updatedAt ? (
                <div className="text-white">{updatedAt}</div>
              ) : (
                <div className="text-white">{createdAt}</div>
              )}
            </div>
          </form>
          <div className="flex justify-center bg-gray-900">
            <button
              type="submit"
              className="font-poppins mt-2 rounded-md px-3.5 py-1.5 bg-yellow-700  text-base  leading-7 text-white hover:bg-yellow-600 m-2 inline-flex"
              onClick={() => setOpenUpdateModal(true)}
            >
              <RxUpdate className="h-6 w-6 mt-1 mr-1" />
              Update
            </button>
            {openUpdateModal ? (
              <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm pt-56">
                <div className="flex items-center justify-center">
                  <div className=" bg-gray-900 rounded-xl p-5 w-full m-2 md:w-2/6">
                    <div className="text-center justify-between flex">
                      <div className="text-center inline-block">
                        <p className="text-white font-semibold text-2xl p-2 justify-between font-bebas">
                          Update Note
                        </p>
                      </div>
                      <span className=" text-white inline-block">
                        <div>
                          <IoClose
                            className="h-7 w-7 cursor-pointer"
                            onClick={() => setOpenUpdateModal(false)}
                          />
                        </div>
                      </span>
                    </div>
                    <hr />
                    <div className="flex mt-5 justify-center">
                      <div className="text-white text-xl font-poppins">
                        Do you really want to Update?
                      </div>
                    </div>
                    <div className="flex justify-center text-white">
                      <button
                        onClick={(e) => {
                          setOpenUpdateModal(false);
                          handleNoteUpdate(e);
                        }}
                        className="mt-5 px-10 py-3.5 bg-yellow-600 hover:bg-yellow-800 font-poppins rounded-lg"
                      >
                        YES
                      </button>
                      <button
                        onClick={() => {
                          setOpenUpdateModal(false);
                        }}
                        className="ml-5 mt-5 px-10 py-3.5 bg-red-600 hover:bg-red-800 font-poppins rounded-lg"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <button
              type="button"
              className="font-poppins mt-2 rounded-md bg-red-700 px-3.5 py-1.5 text-base  leading-7 text-white hover:bg-red-500 m-2 flex"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              <MdDelete className="h-6 w-6 mt-1 mr-1" /> Delete
            </button>
            {openDeleteModal ? (
              <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm pt-56">
                <div className="flex items-center justify-center">
                  <div className=" bg-gray-900 rounded-xl p-5 w-full m-2 md:w-2/6">
                    <div className="text-center justify-between flex">
                      <div className="text-center inline-block">
                        <p className="text-white font-semibold text-2xl p-2 justify-between font-bebas">
                          Delete Note
                        </p>
                      </div>
                      <span className=" text-white inline-block">
                        <div>
                          <IoClose
                            className="h-7 w-7 cursor-pointer"
                            onClick={() => setOpenDeleteModal(false)}
                          />
                        </div>
                      </span>
                    </div>
                    <hr />
                    <div className="flex mt-5 justify-center">
                      <div className="text-white text-xl font-poppins">
                        Do you really want to Delete?
                      </div>
                    </div>
                    <div className="flex justify-center text-white">
                      <button
                        onClick={() => {
                          setOpenUpdateModal(false);
                          deleteNote.mutate();
                        }}
                        className="mt-5 px-10 py-3.5 bg-yellow-600 hover:bg-yellow-800 font-poppins rounded-lg"
                      >
                        YES
                      </button>
                      <button
                        onClick={() => {
                          setOpenDeleteModal(false);
                        }}
                        className="ml-5 mt-5 px-10 py-3.5 bg-red-600 hover:bg-red-800 font-poppins rounded-lg"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
