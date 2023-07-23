const prefix = '/collaborations'
const options = {
  auth: 'musicapp_jwt'
}

const routes = (handler) => [
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
