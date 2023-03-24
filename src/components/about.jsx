import React, { useEffect } from "react";
import axios from "axios";

const About = () => {
  async function Refresh() {
    let config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3OTQ2NDI3MiwianRpIjoiZWQzNmM1NzYtODg5Ni00NzMwLTg5YmQtMDNjZmQ4M2M1ZGRkIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOjEsIm5iZiI6MTY3OTQ2NDI3MiwiZXhwIjoxNjgwMDY5MDcyfQ.ekqijyW-PXXvrGqtYjsimTFFIrenzUN5vHip6i1YSPE",
      },
    };
    let res = await axios.post(
      "https://notemy-api.deta.dev/api/v1/auth/token/refresh/",
      "",
      config
    );
    console.log(res.data["access token"]);
  }
  useEffect(() => {
    Refresh();
  });
  return (
    <>
      <div className=" mt-20 p-3">
        <h2 className=" font-semibold text-2xl">About Us ~</h2>
        <article className="">
          Welcome to our secure note storing app! We are committed to providing
          our users with a safe and reliable platform to store their important
          notes and information.
          <br></br>
          <br></br>
          &nbsp; At our core, we believe that privacy is a fundamental human
          right. That's why we designed our app with security as our top
          priority. We use the latest encryption technologies to ensure that all
          your notes are encrypted before they leave your device and can only be
          decrypted by you.
          <br></br>
          <br></br>
          &nbsp; We also understand the importance of ease-of-use. Our app is
          designed to be intuitive and user-friendly, with a simple and clean
          interface that makes storing and accessing your notes a breeze.
          <br></br>
          <br></br>
          &nbsp; Whether you're looking to keep your passwords, financial
          information, or personal notes safe and secure, our app is the perfect
          solution. We take your privacy seriously, and we are constantly
          working to improve our app and stay ahead of the latest security
          threats.
          <br></br>
          <br></br>
          &nbsp; Thank you for choosing our secure note storing app. We look
          forward to helping you keep your important information safe and
          secure.
        </article>
      </div>
    </>
  );
};

export default About;
