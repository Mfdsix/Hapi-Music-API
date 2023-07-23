const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class PlaylistsHandler {
  constructor (service, validation) {
    this._service = service
    this._validation = validation

    autoBind(this)
  }

  async getAllHandler (request) {
    const { id: credentialId } = request.auth.credentials

    const playlists = await this._service.getAll({
      owner: credentialId
    })
    return successResponse({
      datas: {
        playlists
      }
    })
  }

  async postHandler (request, h) {
    this._validator.validatePlaylistPayload(request.payload)
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
    await this._service.deleteById(id)

    return successResponse({
      message: 'Playlist berhasil dihapus'
    })
  }
}

module.exports = PlaylistsHandler
