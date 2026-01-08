import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Clapperboard, Heart } from 'lucide-react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import type { Movie } from './types';

function App() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

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

  return (
    <Router>
      <div className="min-h-screen text-gray-100 font-sans selection:bg-fuchsia-500 selection:text-white">
        
        {/* Navbar "Glassmorphism" */}
        <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* Logo avec effet Néon */}
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
              
              <div className="flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full border border-white/10">
                <Heart className="w-4 h-4 text-fuchsia-500 fill-fuchsia-500" />
                <span className="font-bold text-fuchsia-100">
                  {favorites.length}
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenu principal avec padding pour compenser la navbar fixe */}
        <main className="pt-24 pb-12 px-4">
          <Routes>
            <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>

        {/* Footer simple */}
        <footer className="text-center py-8 text-violet-400/60 text-sm">
          <p>© 2024 CinéFinder Project. Design inspired by Fantasy UI.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;