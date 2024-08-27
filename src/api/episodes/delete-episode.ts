import { graphqlApi } from "../api";
import { ApiEndpointBuilder } from "../api.types";
import { DeleteEpisodeResponse, EpisodeType } from "./types";

export const deleteEpisode = (builder: ApiEndpointBuilder) => {
  return builder.mutation<DeleteEpisodeResponse, EpisodeType>({
    query: (episode) => ({
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
        variables: { episodeId: episode.id },
      },
    }),
    onQueryStarted: async (deletedEpisode, api) => {
      await api.queryFulfilled;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      api.dispatch(graphqlApi.util.updateQueryData('subscribeToEpisodesEvents', undefined,(draft: NotificationType[]) => {
        draft.push({...deletedEpisode, eventType: "delete"});
      }))
    },
    invalidatesTags: (result) => [{ type: "episodes", id: result?.deleteEpisode }]
  });
  };