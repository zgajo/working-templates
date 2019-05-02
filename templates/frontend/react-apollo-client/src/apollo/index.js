import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getTokenMiddleware, setTokenAfterware } from './middleware';

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_SERVER_URL,
});

const cache = new InMemoryCache();

const httpLinkWithMiddleware = from([getTokenMiddleware, setTokenAfterware.concat(httpLink)]);

export const client = new ApolloClient({
	cache,
	dataIdFromObject: o => o.id,
	link: httpLinkWithMiddleware,
});
