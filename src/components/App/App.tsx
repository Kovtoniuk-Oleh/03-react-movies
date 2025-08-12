import { useState } from 'react';
import css from './App.module.css';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error('Please enter a search term.');
      return;
    }

    if (trimmedQuery === lastQuery) {
      toast('You already searched for this!');
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]);
    setLastQuery(trimmedQuery);

    try {
      const fetchedMovies = await fetchMovies(1, trimmedQuery);
      if (fetchedMovies.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        setMovies(fetchedMovies);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies. Please try again later.');
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // // 🔄 Auto-load popular movies on first render
  // useEffect(() => {
  //   handleSearch('popular');
  // }, []);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <MovieGrid movies={movies} onSelect={openModal} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      <Toaster position="top-center" />
    </div>
  );
}
