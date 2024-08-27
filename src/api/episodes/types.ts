export type EpisodeType = {
  id: string;
  series: string;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  imdbId: string;
  description: string;
  releaseDate: string;
}

export type EpisodesResponse = {
  data: {
    listEpisodes: EpisodeType[]
  }
}

export type SingleEpisodeResponse = {
  data: {
    getEpisodeById: EpisodeType
  }
}

export type CreateEpisodeResponse = {
  data: EpisodeType
}

export type OmdbEpisodeType = {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Season: string,
  Episode: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: {
    Source: string,
    Value: string
  }[],
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  seriesID: string,
  Type: string,
  Response: string
}