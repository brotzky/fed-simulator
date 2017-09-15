// cosmos.proxies.js
import createFetchProxy from 'react-cosmos-fetch-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
// We can import app files here
import configureStore from './src/store/configure-store';

// Read more about configuring Redux in the Redux proxy section below
const ReduxProxy = createReduxProxy({
  createStore: state => configureStore(state)
});

export default [
  createFetchProxy(),
  ReduxProxy,
  createRouterProxy()
];
