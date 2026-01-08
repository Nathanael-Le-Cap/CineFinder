import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Star, Play, X } from 'lucide-react';
import { getMovieDetails } from '../services/api';
import type { MovieDetails } from '../types';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [showTrailer, setShowTrailer] = useState(false); // État pour afficher/cacher la vidéo

  useEffect(() => {
    if (id) {
      getMovieDetails(id).then(setMovie);
    }
  }, [id]);

  if (!movie) return <div className="flex items-center justify-center min-h-screen text-violet-400">Chargement...</div>;

  const director = movie.credits.crew.find((person) => person.job === "Director");
  
  // On cherche la première vidéo qui est un Trailer sur YouTube
  const trailer = movie.videos?.results.find(
    (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
  );

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750';
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen -mt-24 relative">
      
      {/* Grande image de fond */}
      <div className="relative h-[70vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl || posterUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-[#0f172a]/60 to-[#0f172a] via-60%"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-[40vh]">
        <Link to="/" className="inline-flex items-center text-violet-300 hover:text-white transition-colors mb-8 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-violet-600 hover:border-violet-500">
            <ArrowLeft className="mr-2 w-4 h-4" /> Retour
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-start animate-fade-in">
          
          {/* Affiche */}
          <div className="flex-shrink-0 mx-auto md:mx-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-600 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="relative w-72 rounded-xl shadow-2xl z-10"
            />
          </div>

          {/* Infos */}
          <div className="flex-1 text-gray-200">
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 leading-tight">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-sm mb-8 text-violet-200/80 font-medium tracking-wide">
              <span className="flex items-center bg-white/5 px-3 py-1 rounded-lg border border-white/5"><Calendar className="w-4 h-4 mr-2 text-fuchsia-500"/> {new Date(movie.release_date).getFullYear()}</span>
              <span className="flex items-center bg-white/5 px-3 py-1 rounded-lg border border-white/5"><Clock className="w-4 h-4 mr-2 text-fuchsia-500"/> {movie.runtime} min</span>
              <span className="flex items-center bg-white/5 px-3 py-1 rounded-lg border border-white/5"><Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500"/> {movie.vote_average.toFixed(1)}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {movie.genres.map(g => (
                <span key={g.id} className="px-4 py-1.5 rounded-full text-xs font-bold border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:text-white transition-all cursor-default">
                  {g.name}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light border-l-4 border-fuchsia-500 pl-4 bg-white/5 p-4 rounded-r-lg">
                  {movie.overview}
                </p>
              </div>

              {director && (
                <div>
                  <h3 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-1">Réalisateur</h3>
                  <p className="text-white text-lg">{director.name}</p>
                </div>
              )}
            </div>
            
            {/* Bouton Bande Annonce (Ne s'affiche que si une vidéo existe) */}
            {trailer && (
              <button 
                onClick={() => setShowTrailer(true)}
                className="mt-8 bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:shadow-[0_0_30px_rgba(192,38,211,0.7)] transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <Play className="w-5 h-5 mr-2 fill-current" /> Bande annonce
              </button>
            )}
          </div>
        </div>

        {/* Casting */}
        <div className="mt-20 pb-20">
          <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Casting Principal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movie.credits.cast.slice(0, 12).map((actor) => (
              <div key={actor.id} className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition hover:scale-105 group">
                <div className="relative w-full h-48 mb-3 overflow-hidden rounded-lg">
                  <img 
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=?'} 
                    alt={actor.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="font-bold text-sm text-gray-200 truncate">{actor.name}</p>
                <p className="text-xs text-violet-400 truncate">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP VIDEO (MODAL) */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Bouton Fermer */}
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white hover:text-red-500 bg-black/50 p-2 rounded-full transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Lecteur YouTube */}
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default MovieDetail;