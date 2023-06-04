import React, { useState } from "react";
import Link from "next/link";
import notemyApi from "@/utils/api/api";
import { useRouter } from "next/router";

import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { BsArrowRightShort } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showProcesssing, setShowProcessing] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length >= 4) {
      if (password.length > 6) {
        registration();
      } else {
        alert("Make sure Your Password is atleast 6 characters");
      }
    } else {
      alert("Make sure Your UserName is atleast 4 characters");
    }
  };

  let SignUpCredentials = {
    username: username,
    email: email,
    password: password,
  };
  const registration = async () => {
    setShowProcessing(true);

    try {
      const response = await notemyApi.post(
        "auth/register/",
        SignUpCredentials
      );
      const data = response.data;
      console.log(data);
      alert("Account is Created, You can Login Now");
      if (true) {
        router.push("/auth/login");
      }
    } catch (e: any) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
    setShowProcessing(false);
  };
  return (
    <div className="h-screen justify-center flex bg-gray-900">
      <div className=" mt-24 md:mt-36  items-center justify-center my-4 md:w-4/12 w-3/4 ">
        <div className="border-2 border-gray-800 rounded-xl  p-5 bg-gray-800">
          <div className="w-full">
            <h2 className=" text-white text-2xl md:text-3xl font-bold leading-tight text-center font-poppins">
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
                    className="flex h-10 w-full border-2 rounded-md focus:ring-0 border-gray-700 focus:border-indigo-300 p-2 bg-gray-800 text-white"
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="username"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full border-2 rounded-md focus:ring-0 border-gray-700 focus:border-indigo-300 p-2 bg-gray-800 text-white"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                  />
                </div>
              </div>
              {showPassword ? (
                <>
                  <div className="mt-6 justify-between flex ">
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
                    className=" block w-full h-10 border-2 rounded-md focus:ring-0 border-gray-700 focus:border-indigo-300 p-2 bg-gray-800 text-white mt-2"
                    type="text"
                    placeholder="Enter Your Password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                  />
                </>
              ) : (
                <>
                  <div className="mt-6 justify-between flex ">
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
                    className=" block w-full h-10 border-2 rounded-md focus:ring-0 border-gray-700 focus:border-indigo-300 p-2 bg-gray-800 text-white mt-2"
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                  />
                </>
              )}
              <div className=" text-base text-gray-300 mt-8">
                Already have an account?
                <Link
                  href={"/auth/login"}
                  className="ml-2 font-medium text-indigo-300 transition-all duration-200 hover:text-indigo-600 hover:underline focus:text-indigo-700"
                >
                  Login
                </Link>
              </div>
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
