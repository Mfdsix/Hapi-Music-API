// apis
const songs = require('../api/songs')
const albums = require('../api/albums')
const albumLikes = require('../api/album-likes')

// services
const SongsService = require('../services/postgres/SongsService')
const AlbumsService = require('../services/postgres/AlbumsService')
const AlbumLikesService = require('../services/postgres/AlbumLikesService')

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
    plugin: albumLikes,
    options: {
      service: new AlbumLikesService()
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
