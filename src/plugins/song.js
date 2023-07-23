// apis
const albums = require('../api/albums')
const songs = require('../api/songs')

// services
const AlbumsService = require('../services/postgres/AlbumsService')
const SongsService = require('../services/postgres/SongsService')

// validators
const AlbumsValidator = require('../validator/albums')
const SongsValidator = require('../validator/songs')

module.exports = async (server) => {
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
}
