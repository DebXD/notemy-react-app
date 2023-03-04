import Login from "./components/login";
import Notes from "./components/notes";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./components/about";
import Header from "./components/header";
import NoteDetails from "./components/noteDetails";
import Cookies from "js-cookie";
import Register from "./components/register";
import { useEffect, useState } from "react";

function App() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const URL = "https://notemyapi-1-b7327629.deta.app/api/v1/";

  useEffect(() => {
    isAuthenticated();
  }, []);
  const isAuthenticated = () => {
    let accessToken = Cookies.get("AccessToken");
    if (accessToken === undefined) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      <Header title={"Notemy"} searchBar={true} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="*"
          element={
            <Notes
              isAuthenticated={isAuthenticated}
              apiurl={URL}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/login"
          element={<Login apiurl={URL} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register apiurl={URL} />} />
        <Route
          path="/details/:id/"
          element={
            <NoteDetails apiurl={URL} isAuthenticated={isAuthenticated} />
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
export default App;
