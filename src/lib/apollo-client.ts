import { HttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core';

import { environmentVariables } from './environment-variables';
import { setClient } from "svelte-apollo";

const link = new HttpLink({
	uri: environmentVariables.hasuraAPI as string,
    headers: {
        "Content-Type": "application/json",
        "X-Hasura-Admin-Secret": environmentVariables.hasuraSecret,
    },
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	link,
	cache
});

export default apolloClient;