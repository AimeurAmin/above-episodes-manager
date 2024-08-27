import { ApiEndpointBuilder } from "../api.types";
import { EpisodesResponse } from "./types";

export const listEpisodes = (builder: ApiEndpointBuilder) => {
  return builder.query<EpisodesResponse, string>({
    query: (searchTerm) => ({
      url: "",
      method: "POST",
      body: {
        query: `
          query ListEpisodes($search: String) {
            listEpisodes(search: $search) {
              id
              series
              title
              seasonNumber
              episodeNumber
              releaseDate
              description
              imdbId
            }
          }
        `,
        variables: { search: searchTerm },
      },
    }),
    // providesTags: (result, _error, args) => {      
    //   return 
    // },
  });
  };