// SearchBar.js
import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
