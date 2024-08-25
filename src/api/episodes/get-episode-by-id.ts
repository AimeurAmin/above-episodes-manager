import { ApiEndpointBuilder } from "../api.types";
import { EpisodeType, SingleEpisodeResponse } from "./types";

export const getEpisodeById = (builder: ApiEndpointBuilder) => {
  return builder.query<EpisodeType, string>({
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
    transformResponse: (result: SingleEpisodeResponse) => result.data.getEpisodeById
    // providesTags: (result, _error, args) => {      
    //   return 
    // },
  });
  };