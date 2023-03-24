import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandReactNative } from "react-icons/tb";
import { IoMenu, IoClose } from "react-icons/io5";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  const handleMenuClick = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex justify-between items-center bg-white py-3 md:px-10 px-7 ">
        <Link to={"/"}>
          <div className="font-bold text-2xl cursor-pointer items-center flex font-[Poppins] text-gray-800">
            <span className="text-3xl text-blue-500 ">
              <TbBrandReactNative />
            </span>
            Notemy
          </div>
        </Link>
        <div className="absolute right-8 top-5 cursor-pointer md:hidden">
          {openMenu ? (
            <IoClose className="h-6 w-6" onClick={handleMenuClick} />
          ) : (
            <IoMenu className="h-6 w-6" onClick={handleMenuClick} />
          )}
        </div>
        {isAuthenticated() ? (
          <ul
            className={`md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-100 ease-in shadow-2xl ${
              openMenu ? "top-10 " : "top-[-490px]"
            }`}
          >
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-[Poppins] "
              onClick={handleMenuClick}
            >
              <Link
                to={"/"}
                className="text-gray-800 hover:text-gray-400 duration-500 block"
              >
                Home
              </Link>
            </li>
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-[Poppins] "
              onClick={() => {
                handleMenuClick();
                signOut();
              }}
            >
              <Link
                to={"/login"}
                className="text-gray-800 hover:text-gray-400 duration-500 block"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul
            className={`md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-500 ease-in shadow-2xl ${
              openMenu ? "top-10 " : "top-[-490px]"
            }`}
          >
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-[Poppins] "
              onClick={handleMenuClick}
            >
              <Link
                to={"/login"}
                className="text-gray-800 hover:text-gray-400 duration-500 block"
              >
                Home
              </Link>
            </li>

            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-[Poppins] "
              onClick={handleMenuClick}
            >
              <Link
                to={"/login"}
                className="text-gray-800 hover:text-gray-400 duration-500 block"
              >
                Login
              </Link>
            </li>

            <button
              className="mb-5 md:mb-0 bg-indigo-600 text-white py-2 px-5  rounded-md hover:bg-indigo-400 duration-500 md:ml-5 font-[Poppins]"
              onClick={handleMenuClick}
            >
              <Link to={"/about"}>Get Started</Link>
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}
