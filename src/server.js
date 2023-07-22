require('dotenv').config()

const Hapi = require('@hapi/hapi')
// api
const albums = require('./api/albums')
const songs = require('./api/songs')

// services
const AlbumsService = require('./services/postgres/AlbumsService')
const SongsService = require('./services/postgres/SongsService')

// validators
const AlbumsValidator = require('./validator/albums')
const SongsValidator = require('./validator/songs')
const ClientError = require('./exceptions/ClientError')

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
      newResponse.code(response.code || 500)
      return newResponse
    }

    return h.continue
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
