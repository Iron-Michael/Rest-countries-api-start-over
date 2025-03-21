import React, { useState } from "react";
import "../SearchBox.css";

const FilterByRegion = ({ isDarkMode, onRegionChange, regions }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={isDarkMode ? "search-box-dark" : "search-box-light"}>
      {/* <svg
        className={isDarkMode ? "search-icon-dark" : "search-icon-light"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={isDarkMode ? "white" : "black"}
      >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
      </svg> */}
      <select
        className={isDarkMode ? "filter-input-dark" : "filter-input-light"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onRegionChange}
        defaultValue=""
      >
        <option value="" disabled>
          {isFocused ? "" : "Filter by region..."}
        </option>
        {regions.map((region, index) => (
          <option key={index} value={region}> 
            {region === "" ? "All" :region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByRegion;
