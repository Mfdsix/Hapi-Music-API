class AuthorizationError extends Error {
  constructor (message, statusCode = 403) {
    super(message)
    this.statusCode = statusCode
    this.status = 'fail'
    this.name = 'AuthorizationError'
  }
}

module.exports = AuthorizationError
