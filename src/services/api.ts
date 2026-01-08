import axios from 'axios';
import type { MovieResponse, MovieDetails } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'fr-FR',
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await api.get<MovieResponse>('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des films", error);
    return [];
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await api.get<MovieResponse>('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors de la recherche", error);
    return [];
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await api.get<MovieDetails>(`/movie/${id}`, {
      params: {
        // C'est ici qu'on demande les acteurs ET les vidéos en une seule fois
        append_to_response: 'credits,videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur détails film", error);
    return null;
  }
};