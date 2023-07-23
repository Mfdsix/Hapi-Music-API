const autoBind = require('auto-bind')
const { successResponse } = require('../../utils/response')

class UsersHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postUserHandler (request, h) {
    this._validator.validateUserPayload(request.payload)
    const { username, password, fullname } = request.payload

    const userId = await this._service.addUser({ username, password, fullname })

    const response = h.response(successResponse({
      message: 'Registrasu berhasil',
      data: {
        userId
      }
    }))
    response.code(201)
    return response
  }
}

module.exports = UsersHandler
