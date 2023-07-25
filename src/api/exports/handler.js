const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class ExportsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async exportPlaylistHandler (request, h) {
    this._validator.validateExportPlaylistPayload(request.payload)

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail
    }

    await this._service.sendMessage('export:playlist', JSON.stringify(message))

    const response = h.response(successResponse({
      message: 'Permintaan Anda dalam antrean'
    }))
    response.code(201)
    return response
  }
}

module.exports = ExportsHandler
