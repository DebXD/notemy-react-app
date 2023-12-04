import { signIn, useSession, signOut } from "next-auth/react";
import { TbLoader2 } from "react-icons/tb";
import Layout from "./layout";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Profile = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <Layout>
      <div className="md:mt-18 mt-14 p-3">
        <h2 className="text-center text-3xl font-bebas text-white">PROFILE</h2>
        {status !== "loading" && status === "authenticated" ? (
          <div className="justify-center  my-5">
            <div className="m-5">
              <label className="flex text-xl mb-3 font-rubik text-white">
                Your Username :
              </label>
              <input
                className="rounded-md p-4 w-full text-white bg-gray-800"
                disabled
                value={session?.user?.username}
              />
            </div>

            <div className="m-5">
              <label className="flex text-xl mb-3 font-rubik text-white">
                Your Email :
              </label>
              <input
                className="rounded-md p-4 w-full bg-gray-800 text-white"
                disabled
                value={session?.user?.email}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="px-5 py-3 text-white bg-red-800 rounded-md mt-5 hover:bg-red-700 font-poppins duration-100"
                onClick={handleModal}
              >
                Logout!
              </button>
              {openModal ? (
                <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm pt-56">
                  <div className="flex items-center justify-center">
                    <div className=" bg-gray-900 rounded-xl p-5 w-full m-2 md:w-2/6">
                      <div className="text-center justify-between flex">
                        <div className="text-center inline-block">
                          <p className="text-white font-semibold text-2xl p-2 justify-between font-bebas">
                            LOGGING OUT!
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
                      <div className="flex mt-5 justify-center">
                        <div className="text-white text-xl font-poppins">
                          Do You Really Want to Logout?
                        </div>
                      </div>
                      <div className="flex justify-center text-white">
                        <button
                          onClick={() => {
                            signOut();
                            handleModal;
                          }}
                          type="button"
                          className="mt-5 px-10 py-3.5 bg-red-600 hover:bg-red-800 font-poppins rounded-lg"
                        >
                          YES
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
          <div className="flex justify-center h-screen">
            <TbLoader2 className="animate-spin h-8 w-8 text-white" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
