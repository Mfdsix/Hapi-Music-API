const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class PlaylistSongsHandler {
  constructor (service, validation) {
    this._service = service
    this._validation = validation

    autoBind(this)
  }

  async getAllHandler (request) {
    const { id: playlistId } = request.params
    const { id: credentialId } = request.auth.credentials

    const playlist = await this._service.getById(playlistId, credentialId, true)
    return successResponse({
      datas: {
        playlist
      }
    })
  }

  async postHandler (request, h) {
    this._validator.validatePlaylistPayload(request.payload)
    const { id: playlistId } = request.params
    const { songId } = request.payload
    const { id: credentialId } = request.auth.credentials

    await this._service.addSong({
      playlistId,
      songId,
      owner: credentialId
    })

    const response = h.response(successResponse({
      message: 'Lagu berhasil ditambahkan'
    })).code(201)
    return response
  }

  async deleteByIdHandler (request) {
    const { id: playlistId } = request.params
    const { songId } = request.payload
    const { id: credentialId } = request.auth.credentials

    await this._service.deleteSong({
      playlistId,
      songId,
      owner: credentialId
    })

    return successResponse({
      message: 'Lagu berhasil dihapus'
    })
  }
}

module.exports = PlaylistSongsHandler
