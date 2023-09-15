'use client'
import React, { useEffect, useState } from 'react';
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '@/Config/config';
import SearchMovie from '../SearchMovie';
import Cards from './Cards';
import { FaPlay } from 'react-icons/fa';
import { CircleLoader } from 'react-spinners';
import Footer from '../Footer';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function Homes() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = (query: string) => {
    setLoading(true); // Set loading to true while fetching data

    if (query.trim() !== '') {
      // Fetch movie search results from TMDB API
      fetch(`${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('No results found. Please enter a valid movie title.');
          }
          return response.json();
        })
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          setError('An error occurred while fetching movie data.');
          console.error(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    } else {
      // If the search query is empty, fetch and display the top 10 movies
      fetch(`${TMDB_API_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data from TMDB API.');
          }
          return response.json();
        })
        .then((data) => {
          // Take the top 10 movies from the response
          const top10Movies = data.results.slice(0, 10);
          setMovies(top10Movies);
        })
        .catch((error) => {
          setError('An error occurred while fetching movie data.');
          console.error(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    }
  };

  useEffect(() => {
    fetchMovies(''); // Fetch top-rated movies initially
  }, []);

  return (
    // <div>
          <div
      className="bg-cover bg-center h-screen w-full bg-hero-image mb-4"
      style={{ backgroundImage: 'url("hero.jpg")' }}
    >
      <nav className="p-4 flex justify-between items-center">
        {/* <div className="flex items-center space-x-2">
          <img src="/tv.png" alt="TV Icon" className="w-12 h-12 mr-12 ml-12" />
          <span className="text-white text-lg font-semibold">MovieBox</span>
        </div> */}
                <div className="flex items-center space-x-2">
                <img src="/tv.png" alt="TV Icon" className="w-4 h-4 mr-2 ml-2 sm:mr-4 sm:ml-4 sm:w-12 sm:h-12"
/>


          <span className="text-white text-sm font-semibold sm:text-lg ">MovieBox</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-80">
          <SearchMovie onSearch={fetchMovies} />


          </div>
        </div>

                <div className="hidden sm:flex items-center space-x-2">
          <span className="text-white text-lg font-semibold mr-8">Sign in</span>
          <img src="/Menu.png" alt="menu Icon" className="w-12 h-12" />
        </div>

      </nav>

      {/* Content Container */}
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="col-span-4 md:col-span-1 mt-12">
            <div className="text-white text-5xl font-bold mb-6">
              John Wick 3 : Parabellum
            </div>
            <div className="flex space-x-4 mb-6">
              <img src="/imob.png" alt="Image 1" className=" h-5" />
              <span className='text-white'>85.9%</span>
              <img src="/tomatos.png" alt="Image 3" className=" h-5" />
              <span className='text-white'>100%</span>

            </div>
            <div className="text-white text-lg mb-6">
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

<div>

      {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>

                  <CircleLoader color='blue' loading={loading} size={50} />
                  </div>

      ) : error ? (
        <div className='text-white text-center'>{error}</div>

      ) : (
        <div className='mt-28'>
        <Cards movies={movies} />
        </div>
      )}
    </div>
    <div className='mt-20'>
    <Footer/>
    </div>
    </div>





  );
}

export default Homes;
