import React from "react";
import PropTypes from "prop-types";
import Navbar from "./navbar";

const Header = (props) => {
  return (
    <Navbar
      isLoggedIn={props.isLoggedIn}
      getJwtToken={props.getJwtToken}
      apiurl={props.apiurl}
      isAuth={props.isAuth}
      auth={false}
    />
  );
};

Header.defaultProps = {
  title: "Title Placeholder",
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
