require('dotenv').config()

const Hapi = require('@hapi/hapi')
const JWT = require('@hapi/jwt')

// api
const albums = require('./api/albums')
const songs = require('./api/songs')
const authentications = require('./api/authentications')
const users = require('./api/users')

// services
const AlbumsService = require('./services/postgres/AlbumsService')
const SongsService = require('./services/postgres/SongsService')
const AuthenticationsService = require('./services/postgres/AuthenticationsService')
const UsersService = require('./services/postgres/UsersService')

// validators
const AlbumsValidator = require('./validator/albums')
const SongsValidator = require('./validator/songs')
const AuthenticationsValidator = require('./validator/authentications')
const UsersValidator = require('./validator/users')

const TokenManager = require('./utils/token-manager')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  // implement hapi/jwt strategy
  server.auth.strategy('musicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  // set custom error handler
  server.ext('onPreResponse', (request, h) => {
    const { response } = request
    if (response instanceof Error) {
      if (!response.isServer) {
        return h.continue
      }

      const newResponse = h.response({
        status: response.status || 'error',
        message: response.message || 'Terjadi kegagalan pada server kami'
      })
      newResponse.code(response.statusCode || 500)
      return newResponse
    }

    return h.continue
  })

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
  await server.register({
    plugin: albums,
    options: {
      service: new AlbumsService(),
      validator: AlbumsValidator
    }
  })
  await server.register({
    plugin: songs,
    options: {
      service: new SongsService(),
      validator: SongsValidator
    }
  })

  await server.start()
}

init()
