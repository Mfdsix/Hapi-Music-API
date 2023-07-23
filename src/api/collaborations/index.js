const CollaborationsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new CollaborationsHandler(service)
    server.route(routes(handler))
  }
}
