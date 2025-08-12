// import axios from 'axios';
// import { Movie } from '../types/movie';

// const BASE_URL = 'https://api.themoviedb.org/3';
// const SEARCH_ENDPOINT = '/search/movie';
// const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// interface FetchMoviesResponse {
//   results: Movie[];
// }

// export const fetchMovies = async (query: string): Promise<Movie[]> => {
//   try {
//     const response = await axios.get<FetchMoviesResponse>(`${BASE_URL}${SEARCH_ENDPOINT}`, {
//       params: {
//         query,
//         language: 'en-US',
//       },
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });

//     return response.data.results;
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     throw error;
//   }
// };

import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (page: number, query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesResponse>(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      page: page,
      query: query,
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.results;
};
