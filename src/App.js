import Login from "./components/login";
import Notes from "./components/notes";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import About from "./components/about";
import Header from "./components/header";
import NoteDetails from "./components/noteDetails";
import Register from "./components/register";
import Logout from "./components/logout";
import Profile from "./components/profile";
import "./index.css";

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

  const isLoggedIn = (jwtToken) => {
    if (
      jwtToken === null ||
      jwtToken === undefined ||
      jwtToken === "" ||
      jwtToken === " "
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <Header
        title={"Notemy"}
        isLoggedIn={isLoggedIn}
        getJwtToken={getJwtToken}
      />
      <Routes>
        <Route
          path="*"
          element={
            <Notes
              apiurl={URL}
              isLoggedIn={isLoggedIn}
              getJwtToken={getJwtToken}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              apiurl={URL}
              setJwtToken={setJwtToken}
              setRefreshToken={setRefreshToken}
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
    </div>
  );
}
export default App;
