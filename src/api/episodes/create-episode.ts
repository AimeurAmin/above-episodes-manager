import { ApiEndpointBuilder } from "../api.types";
import { CreateEpisodeResponse, EpisodeType } from "./types";

export const createEpisode = (builder: ApiEndpointBuilder) => {
  return builder.mutation<CreateEpisodeResponse, EpisodeType>({
    query: (episode) => ({
      url: "",
      method: "POST",
      body: {
        query: `
          mutation CreateEpisode($episode: EpisodeInput!) {
            createEpisode(episode: $episode) {
              id
              series
              title
              description
              seasonNumber
              episodeNumber
              releaseDate
              imdbId
            }
          }
        `,
        variables: {episode},
      },
    }),
    invalidatesTags: () => [{ type: "episodes", id: "LIST" }]
  });
  };