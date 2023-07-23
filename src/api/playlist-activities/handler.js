const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class PlaylistActivitiesHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async getAllHandler (request) {
    const { id: playlistId } = request.params
    const { id: credentialId } = request.auth.credentials

    const activities = await this._service.getActivities(playlistId, credentialId)
    return successResponse({
      data: {
        playlistId,
        activities
      }
    })
  }
}

module.exports = PlaylistActivitiesHandler
