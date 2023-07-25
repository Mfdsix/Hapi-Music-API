const ExportPlaylistPayloadSchema = require('./schema')
const ClientError = require('../../exceptions/ClientError')

const ExportsValidator = {
  validateExportPlaylistPayload: (payload) => {
    const validationResult = ExportPlaylistPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  }
}

module.exports = ExportsValidator
