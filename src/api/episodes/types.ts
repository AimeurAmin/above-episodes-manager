export type EpisodeType = {
  id: string;
  series: string,
  title: string,
  seasonNumber: number,
  episodeNumber: number
}

export type EpisodesResponse = {
  data: EpisodeType[]
}