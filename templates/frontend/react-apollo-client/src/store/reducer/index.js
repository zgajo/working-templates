import { combineReducers, createStore, compose } from 'redux';
import test from './test';

/**
 * CombineReducers is a helper function that combines our images and videos reducers into a single reducer function that we can now pass to the creatorStore function.
 */

const composeEnhancers = (() => {
	if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	} else {
		return compose;
	}
})();

const rootReducer = combineReducers({
	test,
});

const configStore = () => {
	return {
		...createStore(rootReducer, composeEnhancers()),
	};
};

export default configStore;
