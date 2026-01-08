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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 relative group">
      
      {/* Zone Image (Cliquable vers les détails) */}
      <div className="relative aspect-[2/3]">
        <Link to={`/movie/${movie.id}`} className="block w-full h-full">
          <img 
            src={imageUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover" 
          />
        </Link>
        
        {/* Bouton Favori (Reste au dessus et ne déclenche pas le lien) */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm z-10 ${
            isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Informations */}
      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-lg font-bold text-gray-800 truncate hover:text-blue-600 transition-colors" title={movie.title}>
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center text-yellow-500 mt-1">
          <Star className="w-4 h-4 fill-current mr-1" />
          <span className="text-sm font-semibold text-gray-700">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;