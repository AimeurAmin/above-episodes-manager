import { API_KEY, ID, REGION } from "../constants";

const onUpdateSubscription = (ws: WebSocket) => {
  const subscriptionMessage = {
    type: 'start',
    id: 'onUpdateId',
    payload: {
      data: JSON.stringify({
        query: `
          subscription OnUpdateEpisode{
            onUpdateEpisode{
              id
              series
              title
              seasonNumber
              episodeNumber
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

export default onUpdateSubscription;