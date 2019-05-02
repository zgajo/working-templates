import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './apollo';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import './index.css';
import App from './view/App/App';
import * as serviceWorker from './serviceWorker';

import configureStore from './store/reducer';
const store = configureStore();

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
