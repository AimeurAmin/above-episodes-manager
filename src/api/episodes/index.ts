import { graphqlApi, omdbApi } from "../api";
import { getEpisodeById } from "./get-episode-by-id";
import { listEpisodes } from "./get-episodes";
import { getOmdbEpisodeById } from "./get-omdb-episode-details";

export const episodesApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    listEpisodes: listEpisodes(build),
    getEpisodeById: getEpisodeById(build)
  }),
});

export const episodeOmdbApi = omdbApi.injectEndpoints({
  endpoints: (build) => ({
    getOmdbEpisodeById: getOmdbEpisodeById(build)
  })
})


export const {
  useListEpisodesQuery, 
  useGetEpisodeByIdQuery
} = episodesApi;

export const {
  useGetOmdbEpisodeByIdQuery
} = episodeOmdbApi;