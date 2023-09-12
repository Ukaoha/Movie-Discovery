'use client'
import React, { useState } from 'react';
import { TMDB_API_BASE_URL , TMDB_API_KEY   } from '@/Config/config';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string; 
  }


function Search() {
      
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) {
      setError('Please enter a movie title.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from TMDB API.');
      }

      const data = await response.json();
      setMovies(data.results);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching movie data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        // placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you want to watch"
        className="w-full max-w-custom rounded-lg border-2 border-white-400 p-2 pl-6 border-radius-3 outline-none bg-transparent"

      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
              <p>{movie.release_date}</p>
            </li>
          ))}
        </ul>
      )}
      {/* {movies.length > 0 && (
  <ul>
    {movies.map((movie) => (
      <li key={movie.id}>
        <Link href={`/movie/${movie.id}`} as={`/movie/${movie.id}`}>
          <a>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
          </a>
        </Link>
      </li>
    ))}
  </ul>
)} */}
    </div>
  );
}

export default Search;
