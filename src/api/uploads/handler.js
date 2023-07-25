const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class UploadsHandler {
  constructor (service, validator, albumsService) {
    this._service = service
    this._albumsService = albumsService
    this._validator = validator

    autoBind(this)
  }

  async postUploadPlaylistCoverHandler (request, h) {
    const { id } = request.params
    const { cover } = request.payload
    this._validator.validateImageHeaders(cover.hapi.headers)
    const targetFolder = '/playlist-covers'

    const coverUrl = await this._service.writeFile(cover, cover.hapi, targetFolder)

    this._albumsService.updateCoverUrlById(id, {
      coverUrl
    })

    const response = h.response(successResponse({
      message: 'Sampul berhasil diunggah'
    }))
    response.code(201)
    return response
  }
}

module.exports = UploadsHandler
