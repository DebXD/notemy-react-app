import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { BsArrowRightShort } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

const Register = (props) => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showProcesssing, setShowProcessing] = useState(false);

  const handleShowPassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length >= 4 && password.length > 6) {
      registration();
    } else {
      alert("make sure your credentials are valid");
    }
  };

  let SignUpCredentials = {
    username: username,
    email: email,
    password: password,
  };
  const registration = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setShowProcessing(true);

    try {
      const response = await axios.post(
        `${props.apiurl}auth/register/`,
        SignUpCredentials,
        config
      );
      const data = response.data;
      console.log(data);
      alert("Account is Created, You can Login Now");
      setTimeout(navigate("/login"), 3000);
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
    setShowProcessing(false);
  };
  return (
    <div className="h-screen justify-center flex bg-gray-900">
      <div className=" mt-24 md:mt-20  items-center justify-center my-4 md:w-4/12 w-3/4 ">
        <div className="border-2 rounded-xl  p-5">
          <div className="w-full">
            <h2 className=" text-white text-2xl md:text-3xl font-bold leading-tight text-center font-['Poppins']">
              Register
            </h2>
            <hr className="mt-2" />

            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-white"
                >
                  Username
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white"
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="username"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                  />
                </div>
              </div>
              {showPassword ? (
                <>
                  <div className="mt-5 justify-between flex ">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-white"
                    >
                      Password
                    </label>

                    <HiOutlineEye
                      className="ml-1 w-6 h-6 text-gray-300 mr-2 cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  </div>

                  <input
                    className=" block w-full h-10  rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white mt-2"
                    type="text"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                  />
                </>
              ) : (
                <>
                  <div className="mt-5 justify-between flex ">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-white"
                    >
                      Password
                    </label>

                    <HiOutlineEyeOff
                      className="ml-1 w-6 h-6 text-gray-300 mr-2 cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  </div>

                  <input
                    className=" block w-full h-10  rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white mt-2"
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                  />
                </>
              )}
              <p className=" text-base text-gray-300 mt-5">
                Already have an account?
                <Link
                  to="/login"
                  title=""
                  className="ml-2 font-medium text-indigo-300 transition-all duration-200 hover:text-indigo-600 hover:underline focus:text-indigo-700"
                >
                  Login
                </Link>
              </p>
              {showProcesssing ? (
                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Processing
                    <CgSpinner className="animate-spin w-7 h-7 mt-1 ml-1" />
                  </button>
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Register
                    <BsArrowRightShort className="w-7 h-7 mt-1" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
