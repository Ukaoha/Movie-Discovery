'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import the Link component
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '@/Config/config';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function Card() {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch the top-rated movies from TMDB API
    fetch(`${TMDB_API_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        // Take the top 10 movies from the response
        const top10Movies = data.results.slice(0, 10);
        setTopMovies(top10Movies);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-4">Featured Movie</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topMovies.map((movie) => (
        //   <Link href={`/movies/${movie.id}`} key={movie.id}>
            <a>
              <div
                className="bg-white border border-gray-200 p-4 rounded-lg text-center"
                data-testid="movie-card"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto mb-2"
                  data-testid="movie-poster"
                />
                <p className="font-semibold" data-testid="movie-title">{movie.title}</p>
                <p className="text-gray-600" data-testid="movie-release-date">{movie.release_date}</p>
              </div>
            </a>
        //   </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;
