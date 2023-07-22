const ClientError = require('../../exceptions/ClientError')

class AlbumsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postHandler = this.postHandler.bind(this)
    this.getAllHandler = this.getAllHandler.bind(this)
    this.getByIdHandler = this.getByIdHandler.bind(this)
    this.putByIdHandler = this.putByIdHandler.bind(this)
    this.deleteByIdHandler = this.deleteByIdHandler.bind(this)
  }

  async getAllHandler () {
    const Albumss = await this._service.getAll()
    return {
      status: 'success',
      data: {
        Albumss
      }
    }
  }

  async getByIdHandler (request, h) {
    try {
      const { id } = request.params
      const Albums = await this._service.getById(id)
      return {
        status: 'success',
        data: {
          Albums
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      return response
    }
  }

  async postHandler (request, h) {
    try {
      this._validator.validateAlbumsPayload(request.payload)
      const { title = 'untitled', body, tags } = request.payload

      const AlbumsId = await this._service.addAlbums({ title, body, tags })

      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          AlbumsId
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      return response
    }
  }

  async putByIdHandler (request, h) {
    try {
      this._validator.validateAlbumsPayload(request.payload)
      const { id } = request.params

      await this._service.updateById(id, request.payload)

      return {
        status: 'success',
        message: 'Album berhasil diperbarui'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      return response
    }
  }

  async deleteByIdHandler (request, h) {
    try {
      const { id } = request.params
      await this._service.deleteById(id)

      return {
        status: 'success',
        message: 'Album berhasil dihapus'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      return response
    }
  }
}

module.exports = AlbumsHandler
