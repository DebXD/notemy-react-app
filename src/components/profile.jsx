import React from "react";
import { useNavigate } from "react-router";

const Profile = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-20">
        <h2>Profile</h2>
        <button
          type="button"
          className="p-3 bg-indigo-600 rounded-md mx-5"
          onClick={() => {
            if (window.confirm("Are you sure, You want to Logout?")) {
              navigate("/logout");
            }
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
