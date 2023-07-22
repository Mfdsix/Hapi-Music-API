const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class SongssHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async getAllHandler (request) {
    const { title, performer } = request.query

    const songs = await this._service.getAll({
      title,
      performer
    })
    return successResponse({
      data: {
        songs
      }
    })
  }

  async getByAlbumId (request) {
    const { albumId } = request.params

    const songs = await this._service.getAll({
      albumId
    })
    return successResponse({
      data: {
        songs
      }
    })
  }

  async getByIdHandler (request) {
    const { id } = request.params
    const song = await this._service.getById(id)
    return successResponse({
      data: {
        song
      }
    })
  }

  async postHandler (request, h) {
    this._validator.validatePayload(request.payload)
    const { title, year, genre, performer, duration, albumId } = request.payload

    const songId = await this._service.create({ title, year, genre, performer, duration, albumId })

    const response = h.response(successResponse({
      data: {
        songId
      },
      message: 'Lagu berhasil ditambahkan'
    }))
    response.code(201)
    return response
  }

  async putByIdHandler (request) {
    this._validator.validatePayload(request.payload)
    const { id } = request.params

    await this._service.updateById(id, request.payload)

    return successResponse({
      message: 'Lagu berhasil diupdate'
    })
  }

  async deleteByIdHandler (request) {
    const { id } = request.params
    await this._service.deleteById(id)

    return successResponse({
      message: 'Lagu berhasil dihapus'
    })
  }
}

module.exports = SongssHandler
