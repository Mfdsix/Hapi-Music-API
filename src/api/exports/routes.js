const prefix = '/export'

const routes = (handler) => [
  {
    method: 'POST',
    path: `${prefix}/playlists/{id}`,
    handler: handler.exportPlaylistHandler,
    options: {
      auth: 'musicapp_jwt'
    }
  }
]

module.exports = routes
