import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const httpLinkNest = new HttpLink({
    uri: 'http://localhost:8000/graphql', // Nest.js backend
});

const wsClientNest = createClient({
    url: 'ws://localhost:8000/graphql', // Nest.js backend
});

// const httpLinkDjango = new HttpLink({
//     uri: 'http://localhost:5000/graphql', // Django backend
// });

// const wsClientDjango = createClient({
//     url: 'ws://localhost:5000/graphql', // Django backend
// });

const wsLinkNest = new GraphQLWsLink(wsClientNest);
// const wsLinkDjango = new GraphQLWsLink(wsClientDjango);

const splitLinkNest = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLinkNest,
    httpLinkNest,
);

// const splitLinkDjango = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLinkDjango,
//     httpLinkDjango,
// );

export const apolloClientNest = new ApolloClient({
    link: splitLinkNest,
    cache: new InMemoryCache(),
});

// export const apolloClientDjango  = new ApolloClient({
//     link: splitLinkDjango,
//     cache: new InMemoryCache(),
// });