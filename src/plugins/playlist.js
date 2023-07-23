// apis
const playlists = require('../api/playlists')
const playlistSongs = require('../api/playlist-songs')
const playlistActivities = require('../api/playlist-activities')

// services
const PlaylistsService = require('../services/postgres/PlaylistsService')

// validators
const PlaylistsValidator = require('../validator/playlists')
const PlaylistSongsValidator = require('../validator/playlist-songs')

module.exports = async (server) => {
  await server.register({
    plugin: playlists,
    options: {
      service: new PlaylistsService(),
      validator: PlaylistsValidator
    }
  })
  await server.register({
    plugin: playlistSongs,
    options: {
      service: new PlaylistsService(),
      validator: PlaylistSongsValidator
    }
  })
  await server.register({
    plugin: playlistActivities,
    options: {
      service: new PlaylistsService()
    }
  })
}
