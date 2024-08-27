import { API_KEY, ID, REGION } from "../constants";

const onCreateSubscription = (ws: WebSocket) => {
  const subscriptionMessage = {
    type: 'start',
    id: 'onCreateId',
    payload: {
      data: JSON.stringify({
        query: `
          subscription OnCreateEpisode{
            onCreateEpisode{
              id
              title
              description
              seasonNumber
              episodeNumber
              releaseDate
              imdbId
            }
          }
        `,
        variables:null
      }),
      extensions: {
        authorization: {
          "x-api-key": API_KEY,
          host: `${ID}.appsync-api.${REGION}.amazonaws.com`
        }
      }
    },
  };

  ws.send(JSON.stringify(subscriptionMessage));

}

export default onCreateSubscription;