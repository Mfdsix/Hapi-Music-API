const exportsAPI = require('../api/exports')
const ProducerService = require('../services/rabbitmq/ProducerService')
const ExportsValidator = require('../validator/exports')

module.exports = async (server) => {
  await server.register({
    plugin: exportsAPI,
    options: {
      service: ProducerService,
      validator: ExportsValidator
    }
  })
}
