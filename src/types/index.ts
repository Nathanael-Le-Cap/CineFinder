export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface MovieResponse {
  results: Movie[];
}

// Nouveaux types pour la page de détails
export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  backdrop_path: string;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}