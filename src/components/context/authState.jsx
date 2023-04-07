import React, { useState } from "react";
import AuthContext from "./authContext";
import axios from "axios";

const AuthState = (props) => {
  const [isAuthenticated, setIsAuthencated] = useState(false);
  const token = sessionStorage.getItem("jwt");
  const URL = "https://notemyapi-1-b7327629.deta.app/api/v1/";

  const updateUser = () => {
    const isAuth = async (token) => {
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const res = await axios.get(`${URL}auth/me/`, config);
        if (res.status === 200) {
          console.log(res);
          setIsAuthencated(true);
        }
      } catch (error) {
        setIsAuthencated(false);
      }
    };
    isAuth(token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
