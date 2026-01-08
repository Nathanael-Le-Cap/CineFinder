import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getPopularMovies, searchMovies } from '../services/api';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';

interface HomeProps {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

const Home: React.FC<HomeProps> = ({ favorites, toggleFavorite }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les films au démarrage ou lors d'une recherche
  useEffect(() => {
    const fetchMovies = async () => {
      if (searchTerm.trim()) {
        const results = await searchMovies(searchTerm);
        setMovies(results);
      } else {
        const results = await getPopularMovies();
        setMovies(results);
      }
    };

    // Petit délai pour ne pas spammer l'API quand on tape vite
    const timeoutId = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Barre de recherche */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un film..."
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grille de films */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isFavorite={favorites.some(fav => fav.id === movie.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
        {movies.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-10">Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Home;