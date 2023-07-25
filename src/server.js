require('dotenv').config()

const Hapi = require('@hapi/hapi')
const JWT = require('@hapi/jwt')
const Inert = require('@hapi/inert')

const { registerPlugin } = require('./plugins')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  // implement hapi/jwt strategy
  await server.register([
    {
      plugin: JWT
    },
    {
      plugin: Inert
    }
  ])
  server.auth.strategy('musicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  // set custom error handler
  server.ext('onPreResponse', (request, h) => {
    const { response } = request
    if (response instanceof Error) {
      let payload = response
      if (!response.isServer) {
        payload = response.output.payload
        payload.status = 'fail'
      }

      const newResponse = h.response({
        status: payload?.status || 'error',
        message: payload?.message || 'Terjadi kegagalan pada server kami'
      })
      newResponse.code(payload?.statusCode || 500)
      return newResponse
    }

    return h.continue
  })

  await registerPlugin(server)

  await server.start()
}

init()
