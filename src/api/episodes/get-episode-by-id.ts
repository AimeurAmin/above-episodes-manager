import { ApiEndpointBuilder } from "../api.types";
import { EpisodesResponse } from "./types";

export const getEpisodeById = (builder: ApiEndpointBuilder) => {
  return builder.query<EpisodesResponse, string>({
    query: (episodeId) => ({
      url: "",
      method: "POST",
      body: {
        query: `
          query GetEpisodeById($episodeId: String!) {
            getEpisodeById(episodeId: $episodeId) {
              id
              series
              title
              seasonNumber
              episodeNumber
              imdbId
              description
              releaseDate
            }
          }
        `,
        variables: { episodeId },
      },
    }),
    // providesTags: (result, _error, args) => {      
    //   return 
    // },
  });
  };