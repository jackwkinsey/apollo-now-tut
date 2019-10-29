const { ApolloServer } = require('apollo-server-micro');
const typeDefs = require('../src/schema').default;
const { createStore } = require('../src/utils');
const resolvers = require('../src/resolvers');

const LaunchAPI = require('../src/datasources/launch');
const UserAPI = require('../src/datasources/user');

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

module.exports = server.createHandler({
  path: '/api',
});
