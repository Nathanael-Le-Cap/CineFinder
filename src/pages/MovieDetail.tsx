import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Star } from 'lucide-react';
import { getMovieDetails } from '../services/api';
import type { MovieDetails } from '../types';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (id) {
      getMovieDetails(id).then(setMovie);
    }
  }, [id]);

  if (!movie) return <div className="text-center mt-20">Chargement...</div>;

  const director = movie.credits.crew.find((person) => person.job === "Director");
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750';
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Grande image de fond (Backdrop) */}
      <div 
        className="h-[40vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdropUrl || posterUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Assombrit l'image */}
        <div className="absolute top-4 left-4">
            <Link to="/" className="flex items-center text-white hover:text-blue-400 transition">
                <ArrowLeft className="mr-2" /> Retour
            </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Affiche du film */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="w-64 rounded-xl shadow-2xl border-4 border-white"
            />
          </div>

          {/* Infos principales */}
          <div className="flex-1 text-white md:text-gray-800 pt-10 md:pt-32">
            <h1 className="text-4xl font-bold mb-2 md:text-gray-900">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm mb-6 text-gray-300 md:text-gray-600">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {new Date(movie.release_date).getFullYear()}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {movie.runtime} min</span>
              <span className="flex items-center text-yellow-500"><Star className="w-4 h-4 mr-1 fill-current"/> {movie.vote_average.toFixed(1)}/10</span>
            </div>

            {/* Genres */}
            <div className="flex gap-2 mb-6">
              {movie.genres.map(g => (
                <span key={g.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {g.name}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Synopsis</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{movie.overview}</p>

            {director && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900">Réalisateur</h3>
                <p className="text-gray-700">{director.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Casting */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Casting principal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast.slice(0, 12).map((actor) => (
              <div key={actor.id} className="bg-white rounded-lg shadow p-2 text-center">
                <img 
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Img'} 
                  alt={actor.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <p className="font-bold text-sm text-gray-900 truncate">{actor.name}</p>
                <p className="text-xs text-gray-500 truncate">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;