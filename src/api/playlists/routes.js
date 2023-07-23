const prefix = '/playlists'

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
    path: `${prefix}/{id}`,
    handler: handler.deleteByIdHandler
  }
]

module.exports = routes
