import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  toggleFavorite: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, toggleFavorite }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="group relative bg-[#1e1b4b]/40 rounded-2xl border border-white/5 hover:border-fuchsia-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] overflow-hidden">
      
      {/* Zone Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-2xl">
        <Link to={`/movie/${movie.id}`} className="block w-full h-full">
          <img 
            src={imageUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          {/* Gradient noir en bas de l'image pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </Link>
        
        {/* Bouton Favori */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          className="absolute top-3 right-3 p-2 rounded-full glass-panel hover:bg-white/20 transition-all active:scale-90 group-hover:opacity-100"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isFavorite 
              ? 'text-fuchsia-500 fill-fuchsia-500 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]' 
              : 'text-white'
            }`} 
          />
        </button>

        {/* Note (Badge flottant) */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg glass-panel flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      {/* Informations (Style minimaliste sombre) */}
      <div className="p-4 relative">
        {/* Effet de lueur derrière le texte */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
        
        <Link to={`/movie/${movie.id}`} className="relative block">
          <h3 className="text-base font-bold text-gray-100 truncate group-hover:text-fuchsia-300 transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-violet-300/70 mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;