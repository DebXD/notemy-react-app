import Login from "./components/login";
import Notes from "./components/notes";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import About from "./components/about";
import NoteDetails from "./components/noteDetails";
import Register from "./components/register";
import Profile from "./components/profile";
import "./index.css";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import refreshApi from "./components/refreshToken/refresh";

function App() {
  const URL = "https://notemyapi-1-b7327629.deta.app/api/v1/";

  const getJwtToken = () => {
    return sessionStorage.getItem("jwt");
  };
  const setJwtToken = (token) => {
    sessionStorage.setItem("jwt", token);
  };
  const getRefreshToken = () => {
    return sessionStorage.getItem("refreshToken");
  };
  const setRefreshToken = (token) => {
    sessionStorage.setItem("refreshToken", token);
  };

  return (
    <>
      <AuthProvider
        authType={"localstorage"}
        authName={"_auth"}
        refresh={refreshApi}
      >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login apiurl={URL} />} />
          <Route path="/register" element={<Register apiurl={URL} />} />

          <Route
            path="/"
            element={
              <RequireAuth loginPath={"/login"}>
                <Notes apiurl={URL} getJwtToken={getJwtToken} />
              </RequireAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                setJwtToken={setJwtToken}
                setRefreshToken={setRefreshToken}
              />
            }
          />
          <Route path="/details/:id/" element={<NoteDetails apiurl={URL} />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
