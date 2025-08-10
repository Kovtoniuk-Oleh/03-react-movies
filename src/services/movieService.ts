import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_ENDPOINT = '/search/movie';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (page: number, query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<FetchMoviesResponse>(`${BASE_URL}${SEARCH_ENDPOINT}`, {
      params: {
        page,
        query,
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.results;
  } catch (error: any) {
    console.error('❌ TMDB API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.status_message || 'Failed to fetch movies');
  }
};
