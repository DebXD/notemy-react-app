import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.setJwtToken("");
    props.setRefreshToken("");
    navigate("/login");
  }, [props]);
  return <div>lol</div>;
}
