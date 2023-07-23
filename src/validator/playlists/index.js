const ClientError = require('../../exceptions/ClientError')
const { PlaylistPayloadSchema } = require('./schema')

const PlaylistsValidator = {
  validatePayload: (payload) => {
    const validationResult = PlaylistPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  }
}

module.exports = PlaylistsValidator
