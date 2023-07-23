const prefix = '/playlists/{id}/activities'
const options = {
  auth: 'musicapp_jwt'
}

const routes = (handler) => [
  {
    method: 'GET',
    path: prefix,
    handler: handler.getAllHandler,
    options
  }
]

module.exports = routes
