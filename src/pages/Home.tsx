import React, { useEffect, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, searchMovies } from '../services/api';
import type { Movie } from '../types';

interface HomeProps {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

const Home: React.FC<HomeProps> = ({ favorites, toggleFavorite }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      if (searchTerm.trim() === '') {
        const data = await getPopularMovies();
        setMovies(data);
      } else {
        const data = await searchMovies(searchTerm);
        setMovies(data);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(() => {
      loadMovies();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      
      {/* Hero Section (En-tête style jeu vidéo) */}
      <div className="text-center space-y-6 py-10 animate-fade-in">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-900/50 border border-violet-500/30 text-violet-300 text-xs font-bold tracking-widest uppercase mb-4">
          <Sparkles className="w-3 h-3" />
          <span>L'expérience Cinéma Ultime</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-100 to-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
          Explorez l'Infini
        </h1>
        <p className="text-violet-200/70 text-lg max-w-2xl mx-auto font-light">
          Collectionnez vos films favoris, découvrez des nouveautés et plongez dans un univers visuel unique.
        </p>

        {/* Barre de Recherche Futuriste */}
        <div className="max-w-xl mx-auto relative group mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative flex items-center bg-[#0f172a] rounded-full border border-violet-500/30 shadow-2xl overflow-hidden">
            <Search className="ml-4 w-5 h-5 text-violet-400" />
            <input
              type="text"
              placeholder="Rechercher un film..."
              className="w-full bg-transparent border-none text-white placeholder-violet-500/50 px-4 py-4 focus:ring-0 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grille de Films */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
          <span className="w-1 h-8 bg-gradient-to-b from-fuchsia-500 to-violet-600 mr-3 rounded-full"></span>
          {searchTerm ? 'Résultats de recherche' : 'Films Populaires'}
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
             {[...Array(10)].map((_, i) => (
               <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10">
            {movies.map((movie, index) => (
              <div key={movie.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                <MovieCard
                  movie={movie}
                  isFavorite={favorites.some(fav => fav.id === movie.id)}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;