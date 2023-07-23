class AuthenticationError extends Error {
  constructor (message, statusCode = 401) {
    super(message)
    this.statusCode = statusCode
    this.status = 'fail'
    this.name = 'AuthenticationError'
  }
}

module.exports = AuthenticationError
