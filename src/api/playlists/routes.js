const prefix = '/playlists'
const options = {
  auth: 'musicapp_jwt'
}

const routes = (handler) => [
  {
    method: 'GET',
    path: prefix,
    handler: handler.getAllHandler,
    options
  },
  {
    method: 'POST',
    path: prefix,
    handler: handler.postHandler,
    options
  },
  {
    method: 'DELETE',
    path: `${prefix}/{id}`,
    handler: handler.deleteByIdHandler,
    options
  }
]

module.exports = routes
