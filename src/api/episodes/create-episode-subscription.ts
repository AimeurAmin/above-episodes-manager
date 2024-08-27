import onCreateSubscription from './subscriptions/on-create';
import { ID, REGION, SOCKET_WSS } from './constants';
import { ApiEndpointBuilder } from '../api.types';

export const onCreateEpisode = (builder: ApiEndpointBuilder) => {
  return builder.query<any, void>({
    queryFn: () => ({ data: null}),
    async onCacheEntryAdded(
      _arg: void,
      { updateCachedData, cacheEntryRemoved, /* cacheDataLoaded */ }
    ) {

      const header = btoa(JSON.stringify({
        host: `${ID}.appsync-api.${REGION}.amazonaws.com`,
        'x-api-key': import.meta.env.VITE_APP_API_KEY
      }));

      const payload = btoa("{}");

      const url = `${SOCKET_WSS}?header=${encodeURIComponent(header)}&payload=${encodeURIComponent(payload)}`;

      // Creates a WebSocket connection
      const ws = new WebSocket(url, ['graphql-ws']);

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        // Subscribes to events
        onCreateSubscription(ws);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Handle subscription result
          if (data.type === 'data') {
            const { payload: { data : { onCreateEpisode: newEpisodeData } } } = data
            updateCachedData(draft => {
              // cache should be an array to show multiple notifications
              return newEpisodeData
            });
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      // Clean up subscription when the cache entry is removed
      await cacheEntryRemoved;
      console.log('closing');
      
      ws.close();
    },
  });
};
