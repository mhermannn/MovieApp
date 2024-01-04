import React, { useState } from 'react';
import '../stylowanie/Search.css'

export default function SearchMovie({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div class="szukamy">
      <input
        type="text"
        placeholder="Wpisz tytuł filmu"
        value={searchText}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Szukaj</button>
    </div>
  );
};
