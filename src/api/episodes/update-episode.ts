import { ApiEndpointBuilder } from "../api.types";
import { CreateEpisodeResponse, EpisodeType } from "./types";

export const updateEpisode = (builder: ApiEndpointBuilder) => {
  return builder.mutation<CreateEpisodeResponse, EpisodeType>({
    query: (episode) => ({
      url: "",
      method: "POST",
      body: {
        query: `
          mutation UpdateEpisode ($episode: UpdateEpisodeInput!){
            updateEpisode(
              episode: $episode
            ) {
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
    invalidatesTags: (result) => [{ type: "episodes", id: result?.data.id }]
  });
  };