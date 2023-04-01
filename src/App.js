import Login from "./components/login";
import Notes from "./components/notes";
import { Route, Routes } from "react-router-dom";
import About from "./components/about";
import NoteDetails from "./components/noteDetails";
import Register from "./components/register";
import Profile from "./components/profile";
import "./index.css";
import Navbar from "./components/navbar";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import refreshApi from "./components/refreshToken/refresh";

function App() {
  const URL = "https://notemyapi-1-b7327629.deta.app/api/v1/";

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
                <Notes apiurl={URL} />
              </RequireAuth>
            }
          />

          <Route
            path="/details/:id/"
            element={
              <RequireAuth loginPath={"/login"}>
                <NoteDetails apiurl={URL} />
              </RequireAuth>
            }
          />

          <Route path="/profile" element={<Profile />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
