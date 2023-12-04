import React, { useState } from "react";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { IoLogOut, IoLogIn, IoHelpCircleSharp } from "react-icons/io5";
import { HiHome, HiInformationCircle } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Logo from "./logo";

export default function Navbar() {
  const { data: session } = useSession();
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
      <div className="md:flex justify-between items-center bg-gray-800 py-3 md:px-10 px-7 ">
        <div className="font-bold text-2xl items-center flex font-poppins text-white">
          <span className="text-3xl text-blue-500  cursor-pointer ">
            <Link href={"/"}>
              <Logo />
            </Link>
          </span>
          <Link href={"/"}>otemy</Link>
        </div>

        <div className="absolute right-8 top-5 cursor-pointer md:hidden">
          {openMenu ? (
            <IoClose className="h-7 w-7 text-white" onClick={handleMenuClick} />
          ) : (
            <IoMenu className="h-7 w-7 text-white" onClick={handleMenuClick} />
          )}
        </div>
        {session?.user ? (
          <ul
            className={`md:flex md:items-center md:pb-0 absolute md:static bg-gray-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-100 ease-in shadow-2xl ${
              openMenu ? "top-10 " : "top-[-490px]"
            }`}
          >
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-poppins"
              onClick={handleMenuClick}
            >
              <Link
                href={"/"}
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <HiHome className="h-7 w-7" />
                <p className="ml-2">Home</p>
              </Link>
            </li>
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-poppins "
              onClick={handleMenuClick}
            >
              <Link
                href={"/profile"}
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <BsPersonFill className="h-7 w-7" />
                <p className=" ml-2">Profile</p>
              </Link>
            </li>
            {/* <li className="md:ml-8 text-lg md:my-0 my-5 font-poppins ">
              <Link
                href={"/login"}
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <IoLogOut className="h-7 w-7" />
                <p className="ml-2">Logout</p>
              </Link>
            </li>
            */}
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-poppins "
              onClick={handleMenuClick}
            >
              <Link
                href={"/help"}
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <IoHelpCircleSharp className="h-7 w-7" />
                <p className="ml-2">Help</p>
              </Link>
            </li>
          </ul>
        ) : (
          <ul
            className={`md:flex md:items-center absolute md:static bg-gray-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-200 ease-in shadow-2xl ${
              openMenu ? "top-10 " : "top-[-490px]"
            }`}
          >
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-poppins "
              onClick={handleMenuClick}
            >
              <Link
                href={"/"}
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <HiHome className="h-7 w-7" />
                <p className=" ml-2">Home</p>
              </Link>
            </li>

            <li className="md:ml-8 text-lg md:my-0 my-5 font-poppins ">
              <Link
                href="/auth/login"
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <IoLogIn className="h-7 w-7" />
                <p className=" ml-2">Login</p>
              </Link>
            </li>
            <li
              className="md:ml-8 text-lg md:my-0 my-5 font-poppins "
              onClick={handleMenuClick}
            >
              <Link
                href={"/about"}
                className="text-white hover:text-gray-400 duration-500 flex"
              >
                <HiInformationCircle className="h-7 w-7" />
                <p className=" ml-2">About Us</p>
              </Link>
            </li>

            <Link href={"/getting-started"}>
              <button
                className="mb-5 md:mb-0 bg-indigo-600 text-white py-2 px-5  rounded-md hover:bg-indigo-400 duration-500 md:ml-5 font-poppins"
                onClick={handleMenuClick}
                type="button"
              >
                Get Started
              </button>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}
