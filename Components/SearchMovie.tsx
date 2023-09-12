// Search.tsx (Search component)
'use client'
import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

function SearchMovie({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a movie by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2">
        Search
      </button>
    </div>
  );
}

export default SearchMovie;


