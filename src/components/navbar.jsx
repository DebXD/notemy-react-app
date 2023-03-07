import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { FcKindle } from "react-icons/fc";
import { TbBrandReactNative } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Navbar() {
  const navBtns = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Register", link: "/register" },
    { id: 3, name: "Login", link: "/login" },
    { id: 4, name: "About", link: "/about" },
  ];
  const [openMenu, setOpenMenu] = useState(false);
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
        <div className="font-bold text-2xl cursor-pointer items-center flex font-[Poppins] text-gray-800">
          <span className="text-3xl text-blue-500 ">
            <TbBrandReactNative />
          </span>
          Notemy
        </div>
        <div className="absolute right-8 top-5 cursor-pointer md:hidden">
          {openMenu ? (
            <IoClose className="h-6 w-6" onClick={handleMenuClick} />
          ) : (
            <IoMenu className="h-6 w-6" onClick={handleMenuClick} />
          )}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-500 ease-in ${
            openMenu ? "top-10 " : "top-[-490px]"
          }`}
        >
          {navBtns.map((btn) => (
            <li
              key={btn.id}
              className="md:ml-8 text-lg md:my-0 my-5 font-[Poppins] "
              onClick={handleMenuClick}
            >
              <Link
                to={btn.link}
                className="text-gray-800 hover:text-gray-400 duration-500 block"
              >
                {btn.name}
              </Link>
            </li>
          ))}
          <button
            className="mb-5 md:mb-0 bg-indigo-600 text-white py-2 px-5  rounded-md hover:bg-indigo-400 duration-500 md:ml-5 font-[Poppins]"
            onClick={handleMenuClick}
          >
            <Link to={"/about"}>Get Started</Link>
          </button>
        </ul>
      </div>
    </div>
  );
}
