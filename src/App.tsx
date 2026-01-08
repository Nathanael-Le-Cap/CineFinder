import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Clapperboard, Heart, X, Trash2 } from 'lucide-react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import type { Movie } from './types';

function App() {
  // Gestion de la sauvegarde (Mémoire)
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavs = localStorage.getItem('favorites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // Gestion de l'ouverture du menu latéral
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    if (favorites.some(fav => fav.id === movie.id)) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen text-gray-100 font-sans selection:bg-fuchsia-500 selection:text-white relative overflow-x-hidden">
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-2 rounded-lg shadow-lg group-hover:shadow-fuchsia-500/50 transition-all duration-300">
                <Clapperboard className="text-white w-6 h-6" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200 tracking-wide">
                Ciné<span className="text-fuchsia-400">Finder</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium text-violet-200 hover:text-white transition-colors uppercase tracking-widest">
                Explorer
              </Link>
              
              {/* Le bouton Cœur ouvre maintenant la Sidebar */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition cursor-pointer"
              >
                <Heart className="w-4 h-4 text-fuchsia-500 fill-fuchsia-500" />
                <span className="font-bold text-fuchsia-100">
                  {favorites.length}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="pt-24 pb-12 px-4 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>

        {/* --- ZONE SIDEBAR FAVORIS (Slider Vertical) --- */}
        
        {/* Fond noir transparent (Overlay) quand le menu est ouvert */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Le Menu Latéral lui-même */}
        <div 
          className={`fixed top-0 right-0 h-full w-80 bg-[#0f172a]/95 border-l border-violet-500/30 shadow-[-10px_0_30px_rgba(124,58,237,0.2)] z-[70] transform transition-transform duration-300 ease-out flex flex-col ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* En-tête du menu */}
          <div className="p-6 flex justify-between items-center border-b border-white/10">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200">
              Mes Favoris <span className="text-fuchsia-500">({favorites.length})</span>
            </h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Liste Verticale (Slider) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {favorites.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Aucun favori pour l'instant.</p>
              </div>
            ) : (
              favorites.map((movie) => (
                <div key={movie.id} className="flex gap-3 bg-white/5 p-2 rounded-xl border border-white/5 hover:border-fuchsia-500/30 transition group">
                  {/* Petite Image */}
                  <Link to={`/movie/${movie.id}`} onClick={() => setIsSidebarOpen(false)} className="shrink-0">
                    <img 
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/100x150'} 
                      alt={movie.title} 
                      className="w-16 h-24 object-cover rounded-lg shadow-md"
                    />
                  </Link>
                  
                  {/* Infos + Bouton Supprimer */}
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <Link to={`/movie/${movie.id}`} onClick={() => setIsSidebarOpen(false)}>
                        <h3 className="font-bold text-sm text-gray-100 line-clamp-2 hover:text-fuchsia-400 transition">
                          {movie.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-violet-300 mt-1">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeFavorite(movie.id)}
                      className="self-end flex items-center text-xs text-red-400 hover:text-red-300 transition opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Retirer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Pied du menu */}
          <div className="p-4 border-t border-white/10 bg-black/20">
             <button 
               onClick={() => setIsSidebarOpen(false)}
               className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold transition shadow-lg shadow-violet-900/20"
             >
               Continuer l'exploration
             </button>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;