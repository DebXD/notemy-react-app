import { signIn, useSession, signOut } from "next-auth/react";
import { TbLoader2 } from "react-icons/tb";
import Layout from "./layout";

const Profile = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

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
                className="rounded-md border-2 p-2 w-full text-white bg-gray-800"
                disabled
                value={session?.user?.username}
              />
            </div>

            <div className="m-5">
              <label className="flex text-xl mb-3 font-rubik text-white">
                Your Email :
              </label>
              <input
                className="rounded-md border-2 p-3 w-full bg-gray-800 text-white"
                disabled
                value={session?.user?.email}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="p-2 text-white bg-red-800 rounded-md mt-5 hover:bg-red-700 font-poppins duration-100"
                onClick={() => signOut()}
              >
                Logout
              </button>
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
