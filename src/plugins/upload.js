const uploads = require('../api/uploads')
const StorageService = require('../services/storage/StorageService')
const AlbumsService = require('../services/postgres/AlbumsService')
const UploadsValidator = require('../validator/uploads')

module.exports = async (server) => {
  await server.register({
    plugin: uploads,
    options: {
      service: new StorageService(),
      validator: UploadsValidator,
      albumsService: new AlbumsService()
    }
  })
}
