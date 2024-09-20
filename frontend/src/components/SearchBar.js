import React, { useState } from 'react';

const SearchBar = ({ setSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="my-4">
      <input 
        type="text" 
        placeholder="Search records..." 
        value={query} 
        onChange={handleChange} 
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
  );
};

export default SearchBar;
