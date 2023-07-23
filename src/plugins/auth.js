// apis
const authentications = require('../api/authentications')
const users = require('../api/users')

// services
const AuthenticationsService = require('../services/postgres/AuthenticationsService')
const UsersService = require('../services/postgres/UsersService')

// validators
const AuthenticationsValidator = require('../validator/authentications')
const UsersValidator = require('../validator/users')

// miscs
const TokenManager = require('../utils/token-manager')

module.exports = async (server) => {
  await server.register({
    plugin: authentications,
    options: {
      authenticationsService: new AuthenticationsService(),
      usersService: new UsersService(),
      tokenManager: TokenManager,
      validator: AuthenticationsValidator
    }
  })
  await server.register({
    plugin: users,
    options: {
      service: new UsersService(),
      validator: UsersValidator
    }
  })
}
