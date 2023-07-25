const ClientError = require('../../exceptions/ClientError')
const { ImageHeadersSchema } = require('./schema')

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = ImageHeadersSchema.validate(headers)
    console.log(validationResult)

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message)
    }
  }
}

module.exports = UploadsValidator
