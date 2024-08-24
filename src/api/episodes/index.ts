import api from "../api";
import { listEpisodes } from "./get-episodes";

export const episodesApi = api.injectEndpoints({
  endpoints: (build) => ({
    listEpisodes: listEpisodes(build)
  }),
})


export const { useListEpisodesQuery } = episodesApi;