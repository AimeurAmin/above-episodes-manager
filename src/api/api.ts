import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API_TAGS = [
  'episodes'
]

// Define a service using a base URL and expected endpoints
export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_GRAPHQL_API,
      prepareHeaders: (headers) => {
        const apiKey = import.meta.env.VITE_APP_API_KEY;

        headers.set("Accept", "application/json");

        if (apiKey) {
          headers.set("x-api-key", apiKey);
        }
        return headers;
      },
    }),
    {
      retryCondition: (_error, _args, { attempt }) => attempt < 2,
    }
  ),
  tagTypes: API_TAGS,
  endpoints: () => ({})
});

export const omdbApi = createApi({
  reducerPath: 'omdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_OMDB_API}`
  }),
  endpoints: () => ({})
});
