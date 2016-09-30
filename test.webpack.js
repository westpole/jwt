const clientTestsContext = require.context('./tests/specs/client', true, /\.spec\.js$/);
const clientCoreContext = require.context('./client/app', true, /\.js$/);

clientTestsContext.keys().forEach(clientTestsContext);
clientCoreContext.keys().forEach(clientCoreContext);