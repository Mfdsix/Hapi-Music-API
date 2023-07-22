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

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: albums,
    options: {
      service: new AlbumsService(),
      validator: new AlbumsValidator()
    }
  })
  await server.register({
    plugin: songs,
    options: {
      service: new SongsService(),
      validator: new SongsValidator()
    }
  })

  await server.start()
}

init()
