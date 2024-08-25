import { OmdbApiEndpointBuilder } from "../api.types";
import { OmdbEpisodeType } from "./types";

export const getOmdbEpisodeById = (builder: OmdbApiEndpointBuilder) => {
  return builder.query<OmdbEpisodeType, string>({
    query: (episodeId) => ({
      url: "",
      params: { i: episodeId, apikey: import.meta.env.VITE_APP_OMDB_API_KEY }
    })
  });
  };