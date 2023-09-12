'use client'
import React, { useEffect, useState } from 'react';
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '@/Config/config';
import SearchMovie from '../SearchMovie';
import Cards from './Cards';
import { FaPlay } from 'react-icons/fa';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function Homes() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = (query: string) => {
    if (query.trim() !== '') {
      // Fetch movie search results from TMDB API
      fetch(`${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // If the search query is empty, fetch and display the top 10 movies
      fetch(`${TMDB_API_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
        .then((response) => response.json())
        .then((data) => {
          // Take the top 10 movies from the response
          const top10Movies = data.results.slice(0, 10);
          setMovies(top10Movies);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchMovies(''); // Fetch top-rated movies initially
  }, []);

  return (
<div>
<SearchMovie onSearch={fetchMovies}/>
      
 
      <Cards movies={movies} />

</div>
  );
}

export default Homes;
