import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useEffect } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

interface PropsTypes {
  apiurl : string;
}
const Profile = (props: PropsTypes) => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const token = auth()?.token;

  const signOut = useSignOut();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const isAuthenticated = useIsAuthenticated();

  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (isAuthenticated()) {
      getUserDetails();
    } else {
      signOut();
      navigate("/login");
    }
  }, [navigate, isAuthenticated, signOut]);

  const getUserDetails = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      let response = await axios.get(`${props.apiurl}auth/me/`, config);
      let data = response.data;
      //console.log(data);
      setUsername(data["username"]);
      setEmail(data["email"]);
    } catch (error) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="mt-20">
        <h2 className="text-center text-3xl font-['Bebas_Neue'] text-white">
          PROFILE
        </h2>

        <div className="justify-center  my-5">
          <div className="m-5">
            <label className="flex text-xl mb-3 font-['Rubik'] text-white">
              Your Username :
            </label>
            <input
              className="rounded-md border-2 p-2 w-full text-white bg-gray-800"
              disabled
              value={username}
            />
          </div>

          <div className="m-5">
            <label className="flex text-xl mb-3 font-['Rubik'] text-white">
              Your Email :
            </label>
            <input
              className="rounded-md border-2 p-3 w-full bg-gray-800 text-white"
              disabled
              value={email}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
