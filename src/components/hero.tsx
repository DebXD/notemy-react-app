import Layout from "@/pages/layout";
import Image from "next/image";
import heroimage from "../../public/hero.png";
import { useRef } from "react";

const Hero = () => {
  function handleClickScroll() {
    const element = document.getElementById("ref");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Layout>
      <div className="md:mt-18 mt-14 h-screen text-white bg-gray-900">
        <div className="justify-between sm:flex lg:w-full">
          <div className=" md:mt-10 lg:mt-10">
            <Image
              src={heroimage}
              alt="image"
              width={800}
              height={200}
              className=""
            />
          </div>

          <div className=" p-10">
            <h2 className=" text-3xl sm:text-5xl text-white font-spaceMono md:mt-16 lg:mt-24">
              Store Your Notes Synced, Secured, E2E Encrypted
            </h2>
            <div className="mt-10 md:mt-24 lg:mt-24">
              <button className="hover:duration-500  p-4 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-800 font-poppins lg:text-lg">
                Let&apos;s start
              </button>
              <button
                onClick={handleClickScroll}
                className="hover:duration-500 ml-5 p-3 text-gray-400 font-poppins g-white hover:bg-gray-800  font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Learn More
              </button>
            </div>
            <span id="ref"></span>
          </div>
        </div>
        <div className="p-10 bg-gray-900 mt-18 md:mt-36">
          <h2 className="text-4xl text-white font-poppins font-bold ">
            Features
          </h2>
          <div className="lg:flex lg:justify-center">
            <div className="m-2">
              <div className="mt-10 text-2xl font-semibold lg:inline-flex">
                Fast⚡️
              </div>
              <div className="text-lg lg:text-xl lg:mt-2 pl-2 lg:pl-0">
                It&apos;s using Flask lightweight framework API on the backend
                and React on Frontend to make it fast to give the speed user
                needs
              </div>
            </div>
            <div className="m-2">
              <div className="mt-10 text-2xl font-semibold">
                E2E Encrypted🔐
              </div>
              <div className="text-lg lg:text-xl  lg:mt-2 pl-2 lg:pl-0">
                Your notes stored encrypted using AES-128 means nobody even we
                can&apos;t read it
              </div>
            </div>
            <div className="m-2">
              <div className="mt-10 text-2xl font-semibold">Security🛡</div>
              <div className="text-lg lg:text-xl  lg:mt-2 pl-2 lg:pl-0">
                Your passwords are hashed using bcrypt hashing method so you
                don&apos;t have to worry about security
              </div>
            </div>
            <div className="m-2">
              <div className="mt-10 text-2xl font-semibold">
                Free & Unlimited🆓
              </div>
              <div className="text-lg lg:text-xl lg:mt-2 pl-2 lg:pl-0">
                We care about people who can&apos;t pay, so it is free forever
                and Unlimited
              </div>
            </div>
          </div>
        </div>
        <article className="text-white p-10  bg-gray-900">
          <div>
            <h2 className="text-white font-poppins text-4xl p-2 font-bold md:mt-20  mb-10 lg:mb-0">
              Our Agenda
            </h2>
          </div>
          <div className="text-md lg:text-lg font-rubik lg:p-10">
            <div>
              &nbsp; We are committed to providing our users with a safe and
              reliable platform to store their important notes and information.
            </div>
            <br></br>
            <div>
              At our core, we believe that privacy is a fundamental human right.
              That&apos;s why we designed our app with security as our top
              priority. We use the latest encryption technologies to ensure that
              all your notes are encrypted before they leave your device and can
              only be decrypted by you.
            </div>
            <br></br>
            <div>
              We also understand the importance of ease-of-use. Our app is
              designed to be intuitive and user-friendly, with a simple and
              clean interface that makes storing and accessing your notes a
              breeze.
            </div>
            <br></br>
            <div>
              Whether you&apos;re looking to keep your passwords, financial
              information, or personal notes safe and secure, our app is the
              perfect solution. We take your privacy seriously, and we are
              constantly working to improve our app and stay ahead of the latest
              security threats.
            </div>

            <br></br>

            <div>
              Thank you for choosing our secure note storing app. We look
              forward to helping you keep your important information safe and
              secure.
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Hero;
