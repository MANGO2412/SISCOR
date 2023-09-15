import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchText);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Buscar</button>
    </div>
  );
}

export default SearchBar;
