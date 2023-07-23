const ClientError = require('../../exceptions/ClientError')
const {
  CollaborationPostPayloadSchema,
  CollaborationDeletePayloadSchema
} = require('./schema')

const CollaborationsValidator = {
  validatePostPayload: (payload) => {
    const validationResult = CollaborationPostPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  },

  validateDeletePayload: (payload) => {
    const validationResult = CollaborationDeletePayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  }
}

module.exports = CollaborationsValidator
