const ClientError = require('../../exceptions/ClientError')
const { successResponse } = require('../../utils/response')
const autoBind = require('auto-bind')

class AlbumLikesHandler {
  constructor (service, albumServie) {
    this._service = service
    this._albumService = albumServie

    autoBind(this)
  }

  async countHandler (request, h) {
    const { id } = request.params

    await this._albumService.getById(id)

    const { source, count: likes } = await this._service.countLikes(id)
    const response = h.response(successResponse({
      data: {
        likes
      }
    }))
    if (source === 'cache') response.header('X-Data-Source', 'cache')

    return response
  }

  async postHandler (request, h) {
    const { id: albumId } = request.params
    const { id: userId } = request.auth.credentials

    await this._albumService.getById(albumId)
    const isLiked = await this._service.checkLike({
      albumId,
      userId
    })

    if (isLiked) throw new ClientError('Album sudah pernah disukai')

    await this._service.addLike({
      albumId,
      userId
    })
    const response = h.response(successResponse({
      message: 'Album berhasil disukai'
    }))
    response.code(201)

    return response
  }

  async deleteHandler (request) {
    const { id: albumId } = request.params
    const { id: userId } = request.auth.credentials

    await this._albumService.getById(albumId)
    const isLiked = await this._service.checkLike({
      albumId,
      userId
    })

    if (!isLiked) throw new ClientError('Album belum pernah disukai')

    await this._service.removeLike({
      albumId,
      userId
    })

    return successResponse({
      message: 'Album batal disukai'
    })
  }
}

module.exports = AlbumLikesHandler
