import api from "../api";
import { getEpisodeById } from "./get-episode-by-id";
import { listEpisodes } from "./get-episodes";

export const episodesApi = api.injectEndpoints({
  endpoints: (build) => ({
    listEpisodes: listEpisodes(build),
    getEpisodeById: getEpisodeById(build)
  }),
})


export const {
  useListEpisodesQuery, 
  useGetEpisodeByIdQuery
} = episodesApi;