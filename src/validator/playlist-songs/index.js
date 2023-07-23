const ClientError = require('../../exceptions/ClientError')
const {
  PlaylistSongPostPayloadSchema,
  PlaylistSongDeletePayloadSchema
} = require('./schema')

const PlaylistPostsValidator = {
  validatePostPayload: (payload) => {
    const validationResult = PlaylistSongPostPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  },

  validateDeletePayload: (payload) => {
    const validationResult = PlaylistSongDeletePayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  }
}

module.exports = PlaylistPostsValidator
