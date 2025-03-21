import React, { useState } from "react";
import Moon from "../assets/Moon.jsx";

const Navbar = ({isDarkMode,setIsDarkMode}) => {


  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <div className="navigation-bg">
      <div className="box-navigation">
        <div className={`search-advice-dark ${isDarkMode ? "" : "search-advice-light"}`}>Where in the world?</div>
        <button
          className={`dark-mode-btn ${isDarkMode ? "" : "light-mode-btn"}`}
          onClick={toggleMode}
        >
          <Moon /> {isDarkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;