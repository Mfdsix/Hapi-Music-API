const prefix = '/playlists/{id}/songs'

const routes = (handler) => [
  {
    method: 'GET',
    path: prefix,
    handler: handler.getAllHandler
  },
  {
    method: 'POST',
    path: prefix,
    handler: handler.postHandler
  },
  {
    method: 'DELETE',
    path: prefix,
    handler: handler.deleteHandler
  }
]

module.exports = routes
