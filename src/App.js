import Login from "./components/login";
import Notes from "./components/notes";
import { Route, Routes } from "react-router-dom";
import About from "./components/about";
import NoteDetails from "./components/noteDetails";
import Register from "./components/register";
import Logout from "./components/logout";
import Profile from "./components/profile";
import "./index.css";
import { useState, useEffect } from "react";
import UnauthNav from "./components/unAuthNavbar";
import Navbar from "./components/navbar";

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

  const [auth, setAuth] = useState(sessionStorage.getItem("jwt"));

  useEffect(() => {
    setAuth(sessionStorage.getItem("jwt"));
    // const checkUser = (token) => {};
  }, []);

  return (
    <>
      {auth ? (
        <Navbar getJwtToken={getJwtToken} apiurl={URL} auth={false} />
      ) : (
        <UnauthNav />
      )}

      <Routes>
        <Route
          path="/"
          element={<Notes apiurl={URL} getJwtToken={getJwtToken} />}
        />

        <Route
          path="/login"
          element={
            <Login
              apiurl={URL}
              setJwtToken={setJwtToken}
              setRefreshToken={setRefreshToken}
              setAuth={setAuth}
            />
          }
        />
        <Route path="/register" element={<Register apiurl={URL} />} />
        <Route
          path="/logout"
          element={
            <Logout
              setJwtToken={setJwtToken}
              setRefreshToken={setRefreshToken}
              setAuth={setAuth}
            />
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
    </>
  );
}
export default App;
