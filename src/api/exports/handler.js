const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class ExportsHandler {
  constructor (service, validator, playlistService) {
    this._service = service
    this._validator = validator
    this._playlistService = playlistService

    autoBind(this)
  }

  async exportPlaylistHandler (request, h) {
    const { id } = request.params
    this._validator.validateExportPlaylistPayload(request.payload)
    const { id: credentialId } = request.auth.credentials

    await this._playlistService.getById(id, credentialId)

    const message = {
      playlistId: id,
      userId: credentialId,
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
