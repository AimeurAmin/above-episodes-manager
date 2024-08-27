import { API_KEY, ID, REGION } from "../constants";

const onDeleteSubscription = (ws: WebSocket) => {
  const subscriptionMessage = {
    type: 'start',
    id: 'onDeleteId',
    payload: {
      data: JSON.stringify({
        query: `
          subscription onDeleteEpisode {
            onDeleteEpisode
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

export default onDeleteSubscription;