const PlaylistActivitiesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'playlist-activities',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new PlaylistActivitiesHandler(service)
    server.route(routes(handler))
  }
}
