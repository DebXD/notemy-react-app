import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { HiDocumentAdd } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useMutation } from "react-query";
import { addNote } from "@/utils/api/api";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNote = ({ setLoading }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const [openModal, setOpenModal] = useState(false);

  //const mutation = useMutation({mutationFn: addNote(title, content), )})
  const handleModal = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };
  const { mutate } = useMutation({
    mutationKey: ["note"],
    mutationFn: async (token: string) => {
      if (token) {
        let res = await addNote(title, content, token);
        return res.data;
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = session?.user?.access_token;
    if (token) {
      setLoading(true);
      mutate(token);
      setLoading(false);
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
                    required
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
                    required
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
