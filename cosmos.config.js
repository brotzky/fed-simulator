module.exports = {
  // Read components from multiple locations. Useful for including Redux
  // containers or if you split your UI per sections.
  componentPaths: [
    'src/components',
  ],

  // Where to serve static files from. Like --content-base in webpack-dev-server.
  publicPath: 'src/public',

  // NEW: Plugin system for React Cosmos!
  // Here is how to activate Redux:
  proxies: [
    require('react-cosmos-redux-proxy')({
      // Called when fixture loads with `fixture.reduxState` as initial state.
      // See Flatris example for a complete Redux integration.
      createStore: (initialState) => {
        return Redux.createStore(yourReducer, initialState, yourMiddleware);
      },
    }),
  ],

  // Render inside custom root element. Useful if that root element already
  // has styles attached, but bad for encapsulation.
  containerQuerySelector: '#root',

  // WARNING: Make sure to add webpack.HotModuleReplacementPlugin to your
  // webpack config plugins section if you enable this. (and magic will ignite)
  hot: true,

  // These ones are self explanatory
  hostname: 'localhost',
  port: 8989,
  webpackConfigPath: './config/webpack.config.dev',
};
