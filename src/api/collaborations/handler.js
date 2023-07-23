const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class CollaborationsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postHandler (request, h) {
    this._validator.validatePostPayload(request.payload)

    const { playlistId, userId } = request.payload
    const { id: credentialId } = request.auth.credentials

    const collaborationId = await this._service.addCollaborator({
      playlistId,
      userId,
      owner: credentialId
    })
    const response = h.response(successResponse({
      data: {
        collaborationId
      }
    })).code(201)

    return response
  }

  async deleteHandler (request) {
    this._validator.validatePostPayload(request.payload)

    const { playlistId, userId } = request.payload
    const { id: credentialId } = request.auth.credentials

    await this._service.deleteCollaborator({
      playlistId,
      userId,
      owner: credentialId
    })
    return successResponse({
      message: 'Kolaborator berhasil dihapus'
    })
  }
}

module.exports = CollaborationsHandler
