const ClientError = require('./ClientError')

class NotFoundError extends ClientError {
  constructor (message) {
    super(message, 404)
    this.name = 'NotFoundError'
    this.status = 'fail'
  }
}

module.exports = NotFoundError
