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

// Nouveau type pour la vidéo
export interface Video {
  id: string;
  key: string; // L'identifiant YouTube (ex: d9MyW72ELq0)
  name: string;
  site: string; // "YouTube", "Vimeo"...
  type: string; // "Trailer", "Teaser"...
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  backdrop_path: string;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  // On ajoute la liste des vidéos ici
  videos: {
    results: Video[];
  };
}