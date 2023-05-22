import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
//? import icons

import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { BsArrowRightShort } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showProcesssing, setShowProcessing] = useState(false);
  let loginCredentials = {
    email: email,
    password: password,
  };

  async function handleSubmit(e: React.FormEvent) {
    setShowProcessing(true);
    e.preventDefault();
    console.log(loginCredentials);
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
    setShowProcessing(false);
  }

  return (
    <div className="h-screen justify-center flex bg-gray-900">
      <div className=" mt-24 md:mt-36  items-center justify-center my-4 md:w-4/12 w-3/4 ">
        <div className="border-2 rounded-xl  p-5 bg-gray-800">
          <div className="w-full">
            <h2 className=" text-white text-2xl md:text-3xl font-bold leading-tight text-center font-poppins">
              Login
            </h2>
            <hr className="mt-2" />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex border-2 h-10 w-full rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                    required
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
                      className="ml-1 w-6 h-6  text-gray-300 mr-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>

                  <input
                    className=" block w-full h-10 border-2 rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white mt-2"
                    type="text"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    required
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
                      className="ml-1 w-6 h-6  text-gray-300 mr-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>

                  <input
                    className=" block w-full h-10 border-2 rounded-md focus:ring-0 focus:border-indigo-300 p-2 bg-gray-800 text-white mt-2"
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    required
                  />
                </>
              )}

              <p className=" text-base text-gray-300 mt-10">
                Don&apos;t have an account?
                <Link
                  href="/auth/register"
                  title=""
                  className="ml-2 font-medium text-indigo-300 transition-all duration-200 hover:text-indigo-600 hover:underline focus:text-indigo-700"
                >
                  Register
                </Link>
              </p>
              {showProcesssing ? (
                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Processing...
                    <CgSpinner className="animate-spin w-7 h-7 mt-1 ml-1" />
                  </button>
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Login
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

export default Login;
