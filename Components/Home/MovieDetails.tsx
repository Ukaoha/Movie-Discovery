// MovieDetails.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '@/Config/config';

interface MovieDetails {
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
}

function MovieDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the movie ID from the route

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch movie details by ID
      fetch(`${TMDB_API_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then((response) => response.json())
        .then((data) => {
          // Extract relevant movie details
          const { title, release_date, runtime, overview } = data;
          setMovieDetails({ title, release_date, runtime, overview });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-4" data-testid="movie-title">
        {movieDetails.title}
      </h2>
      <p data-testid="movie-release-date">Release Date (UTC): {movieDetails.release_date}</p>
      <p data-testid="movie-runtime">Runtime (minutes): {movieDetails.runtime}</p>
      <p data-testid="movie-overview">Overview: {movieDetails.overview}</p>
    </div>
  );
}

export default MovieDetails;
