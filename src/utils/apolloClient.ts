import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

// https://battleship-game-james-3cb6c991d5f4.herokuapp.com/graphql
const httpLink = new HttpLink({
    uri: 'https://battleship-game-ai-backend.onrender.com/graphql',
});

const wsClient = createClient({
    url: 'wss://battleship-game-ai-backend.onrender.com/graphql',
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});


