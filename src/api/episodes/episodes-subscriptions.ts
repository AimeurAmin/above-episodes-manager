import { ApiEndpointBuilder } from '../api.types';
import { ID, REGION, SOCKET_WSS } from './constants';
import onCreateSubscription from './subscriptions/on-create';
import onUpdateSubscription from './subscriptions/on-update';
import { EpisodeType, NotificationType } from './types';

export const subscribeToEpisodesEvents = (builder: ApiEndpointBuilder) => {
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
        onUpdateSubscription(ws);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as { 
            id: "onCreateId" | "onUpdateId" | "onDeleteId",
            payload: { data: {
              [key: string]: EpisodeType
            }},
            type: any
          };
          // Handle subscription result
          if (data.type === 'data') {
            const { payload: { data : { onCreateEpisode, onUpdateEpisode } } } = data
            updateCachedData(draft => {
              console.log(data);
              
              const episode = onCreateEpisode || onUpdateEpisode;
              const eventType = {
                onCreateId: "create",
                onUpdateId: "update",
                onDeleteId: "delete"
              }[data.id]
              const newEpisodeData = { ...episode, eventType }
              if(!draft) return [newEpisodeData] as NotificationType[]
              return [...draft, newEpisodeData] as NotificationType[];
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
