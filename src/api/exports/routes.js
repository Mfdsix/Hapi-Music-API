const prefix = '/export'

const routes = (handler) => [
  {
    method: 'POST',
    path: `${prefix}/playlist/{id}`,
    handler: handler.exportPlaylistHandler,
    options: {
      auth: 'notesapp_jwt'
    }
  }
]

module.exports = routes
