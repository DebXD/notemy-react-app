import { useState, React } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faKey,
  faEnvelope,
  faLock,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

const Login = (props) => {
  //* add icon to library
  library.add(
    faUser,
    faKey,
    faEnvelope,
    faEyeSlash,
    faEye,
    faLock,
    faSquare,
    faSquareCheck
  );

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleRememberMe = () => {
    if (remember === true) {
      setRemember(false);
    } else {
      setRemember(true);
    }
  };

  const handleShowPassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  let loginCredentials = {
    email: email,
    password: password,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${props.apiurl}auth/login/`,
        loginCredentials,
        config
      );
      const data = response.data;
      //console.log(data)
      console.log(loginCredentials);
      props.setIsLoggedIn(true);
      let accessToken = await data["user"]["access token"];
      //let refreshToken = await data['user']['refresh token'];
      // Set cookie
      Cookies.set("AccessToken", accessToken);
      //Cookies.set('RefreshToken', refreshToken)
      navigate("/");
    } catch {
      if (!email || !password) {
        alert("email or password can't be empty");
      }
      alert("Unauthorized");
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-800 h-screen">
      <form onSubmit={handleSubmit}>
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-center text-3xl block font-semibold font-mono ">
            Login
          </h1>
          <hr className="mt-3" />
          <div className="mt-3">
            <label className="block text-base">
              Email address <FontAwesomeIcon icon="fa-solid fa-envelope" />
            </label>
            <input
              type="email"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
              id="inputEmail"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mt-3">
            <label>
              Password <FontAwesomeIcon icon="fa-solid fa-key" />
            </label>

            <input
              type="password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
              id="inputPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {showPassword ? (
              <input
                type="text"
                className="border w-full text-base px-2 py-1 rounded-md bg-gray-300"
                value={password}
                disabled
              />
            ) : (
              ""
            )}
            <div className="mt-1">
              <i
                className={
                  showPassword
                    ? "fa-regular fa-eye mx-2"
                    : "fa-regular fa-eye-slash mx-2 mb-2"
                }
                onClick={handleShowPassword}
              ></i>
            </div>
          </div>
          <div className="mt-2 mb-1 flex justify-between">
            <div>
              <i
                className={
                  remember
                    ? "fa-solid fa-square-check mx-1"
                    : "fa-solid fa-square mx-1"
                }
                onClick={handleRememberMe}
              ></i>
              Remember Me
            </div>
            <div>
              <a href="/" className=" text-indigo-800">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="text-center border-2 bg-indigo-700 text-white py-1 px-5 hover:bg-indigo-800 active:bg-indigo-900 rounded-md">
            <button type="submit" className="">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
