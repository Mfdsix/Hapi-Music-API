const prefix = '/albums/{id}/likes'
const options = {
  auth: 'musicapp_jwt'
}

const routes = (handler) => [
  {
    method: 'GET',
    path: prefix,
    handler: handler.countHandler
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
