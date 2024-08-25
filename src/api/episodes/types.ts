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