const prefix = '/playlists/{id}/songs'
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
    path: prefix,
    handler: handler.deleteHandler,
    options
  }
]

module.exports = routes
