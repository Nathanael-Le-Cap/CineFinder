import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import Home from './pages/Home';
import type { Movie } from './types';

function App() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Charger les favoris depuis le stockage local (mémoire du navigateur)
  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  // Sauvegarder les favoris à chaque changement
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
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        {/* Barre de navigation */}
        <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center text-xl font-bold hover:opacity-90">
              <Film className="mr-2" /> CinéFinder
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200 transition-colors">Accueil</Link>
              <span className="font-semibold bg-blue-700 px-3 py-1 rounded-full">
                Favoris: {favorites.length}
              </span>
            </div>
          </div>
        </nav>

        {/* Contenu */}
        <main>
          <Routes>
            <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;