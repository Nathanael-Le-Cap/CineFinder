import axios from 'axios';
import type { MovieResponse } from '../types';

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
    console.error("Erreur récup films", error);
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
    console.error("Erreur recherche", error);
    return [];
  }
};