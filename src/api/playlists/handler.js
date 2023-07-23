const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class PlaylistsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async getAllHandler (request) {
    const { id: credentialId } = request.auth.credentials

    const playlists = await this._service.getAll({
      owner: credentialId
    })
    return successResponse({
      data: {
        playlists
      }
    })
  }

  async postHandler (request, h) {
    this._validator.validatePayload(request.payload)
    const { name } = request.payload
    const { id: credentialId } = request.auth.credentials

    const playlistId = await this._service.create({
      name,
      owner: credentialId
    })

    const response = h.response(successResponse({
      data: {
        playlistId
      },
      message: 'Playlist berhasil ditambahkan'
    })).code(201)
    return response
  }

  async deleteByIdHandler (request) {
    const { id } = request.params
    const { id: credentialId } = request.auth.credentials

    await this._service.deleteById(id, credentialId)

    return successResponse({
      message: 'Playlist berhasil dihapus'
    })
  }
}

module.exports = PlaylistsHandler
