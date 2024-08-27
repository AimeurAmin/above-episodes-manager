import { graphqlApi, omdbApi } from "../api";
import { onCreateEpisode } from "./create-episode-subscription";
import { getEpisodeById } from "./get-episode-by-id";
import { listEpisodes } from "./get-episodes";
import { getOmdbEpisodeById } from "./get-omdb-episode-details";

export const episodesApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    listEpisodes: listEpisodes(build),
    getEpisodeById: getEpisodeById(build),
    onCreateEpisode: onCreateEpisode(build)
  }),
});

export const episodeOmdbApi = omdbApi.injectEndpoints({
  endpoints: (build) => ({
    getOmdbEpisodeById: getOmdbEpisodeById(build)
  })
})


export const {
  useListEpisodesQuery, 
  useGetEpisodeByIdQuery,
  useOnCreateEpisodeQuery
} = episodesApi;

export const {
  useGetOmdbEpisodeByIdQuery
} = episodeOmdbApi;