// NavBar.tsx (NavBar component)
'use client'
import React, { useState } from 'react';
import Search from '../Search';

interface NavBarProps {
  onSearch: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/tv.png" alt="TV Icon" className="w-12 h-12 mr-12 ml-12" />
        <span className="text-white text-lg font-semibold">MovieBox</span>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="What do you want to watch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-custom rounded-lg border-2 border-white-400 p-2 pl-6 border-radius-3 outline-none bg-transparent"
          />
          <button onClick={handleSearch} className="absolute top-2 right-4 text-white">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-white text-lg font-semibold mr-8">Sign in</span>
        <img src="/Menu.png" alt="menu Icon" className="w-12 h-12 " />
      </div>
    </nav>
  );
};

export default NavBar;
