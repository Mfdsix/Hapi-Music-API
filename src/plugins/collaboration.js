// apis
const collaborations = require('../api/collaborations')

// services
const PlaylistsService = require('../services/postgres/PlaylistsService')

// validators
const CollaborationsValidator = require('../validator/collaborations')

module.exports = async (server) => {
  await server.register({
    plugin: collaborations,
    options: {
      service: new PlaylistsService(),
      validator: CollaborationsValidator
    }
  })
}
