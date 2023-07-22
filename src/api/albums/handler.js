const { successResponse } = require('../../utils/response')
const autoBind = require('auto-bind')

class AlbumsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async getAllHandler () {
    const albums = await this._service.getAll()
    return successResponse({
      datas: {
        albums
      }
    })
  }

  async getByIdHandler (request) {
    const { id } = request.params
    const album = await this._service.getById(id)
    return successResponse({
      data: {
        album
      }
    })
  }

  async postHandler (request, h) {
    this._validator.validateAlbumsPayload(request.payload)
    const { title = 'untitled', body, tags } = request.payload

    const albumId = await this._service.addAlbums({ title, body, tags })

    h.response().code(201)
    return successResponse({
      data: {
        albumId
      },
      message: 'Album berhasil ditambahkan'
    })
  }

  async putByIdHandler (request) {
    this._validator.validateAlbumsPayload(request.payload)
    const { id } = request.params

    await this._service.updateById(id, request.payload)

    return successResponse({
      message: 'Album berhasil diupdate'
    })
  }

  async deleteByIdHandler (request) {
    const { id } = request.params
    await this._service.deleteById(id)

    return successResponse({
      message: 'Album berhasil dihapus'
    })
  }
}

module.exports = AlbumsHandler
