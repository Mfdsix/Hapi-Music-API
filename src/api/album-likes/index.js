const AlbumsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'album-likes',
  version: '1.0.0',
  register: async (server, { service, albumService }) => {
    const handler = new AlbumsHandler(service, albumService)
    server.route(routes(handler))
  }
}
