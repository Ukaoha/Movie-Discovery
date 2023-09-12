import React from 'react';
import { FaPlay } from 'react-icons/fa'; // Import the play icon from react-icons
import Search from '../Search';
import SearchMovie from '../SearchMovie';

const Hero: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center h-screen w-full bg-hero-image"
      style={{ backgroundImage: 'url("hero.jpg")' }}
    >
      <nav className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/tv.png" alt="TV Icon" className="w-12 h-12 mr-12 ml-12" />
          <span className="text-white text-lg font-semibold">MovieBox</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-80">
          {/* <SearchMovie onSearch={fetchMovies} /> */}
          <Search/>

            <span className="absolute top-2 right-4 text-white">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-white text-lg font-semibold mr-8">Sign in</span>
          <img src="/Menu.png" alt="menu Icon" className="w-12 h-12 " />
        </div>
      </nav>

      {/* Content Container */}
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="col-span-4 md:col-span-1">
            <div className="text-white text-5xl font-bold mb-4">
              John Wick 3 : Parabellum
            </div>
            <div className="flex space-x-4 mb-4">
              <img src="/img1.jpg" alt="Image 1" className="w-20 h-20" />
              <img src="/img2.jpg" alt="Image 2" className="w-20 h-20" />
              <img src="/img3.jpg" alt="Image 3" className="w-20 h-20" />
            </div>
            <div className="text-white text-lg mb-4">
              John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
            </div>
               <div className=" flex   items-center">
            <button className="bg-rose-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
              <FaPlay className="text-xl" />
              <span>Watch Trailer</span>
            </button>
          </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
