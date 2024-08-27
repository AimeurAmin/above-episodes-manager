import { ApiEndpointBuilder } from "../api.types";
import { DeleteEpisodeResponse } from "./types";

export const deleteEpisode = (builder: ApiEndpointBuilder) => {
  return builder.mutation<DeleteEpisodeResponse, string>({
    query: (episodeId) => ({
      url: "",
      method: "POST",
      body: {
        query: `
          mutation Delete ($episodeId: String!){
            deleteEpisode(
              episodeId: $episodeId
            ) 
          }
        `,
        variables: {episodeId},
      },
    }),
    invalidatesTags: (result) => [{ type: "episodes", id: result?.deleteEpisode }]
  });
  };