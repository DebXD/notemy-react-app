import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Header = (props) => {
  //console.log(props.isLoggedIn)
  return <Navbar />;
};

Header.defaultProps = {
  title: "Title Placeholder",
};

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired,
};
export default Header;
