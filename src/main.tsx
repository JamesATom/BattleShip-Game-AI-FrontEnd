import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './utils/apolloClient';
import { GOOGLE_CLIENT_ID_QUERY } from './utils/graphqlQuery/gql.ts';

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);

function Main() {
    const [googleClientID, setGoogleClientID] = React.useState<string>('');

    React.useEffect(() => {
        if (!googleClientID) {
            apolloClient.query({ query: GOOGLE_CLIENT_ID_QUERY })
                .then((result) => {
                    setGoogleClientID(result.data.googleClientID.clientID);
                })
                .catch((error) => {
                    console.log('Error retrieving Google Client ID: ', error);
            });
        }
    }, []);

    return (
        <React.StrictMode>
            <GoogleOAuthProvider clientId={googleClientID}>
                <ApolloProvider client={apolloClient}>
                    <App />
                </ApolloProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>
    );
}

root.render(<Main />);
