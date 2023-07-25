const AuthPlugin = require('./auth')
const AlbumPlugin = require('./album')
const PlaylistPlugin = require('./playlist')
const CollaborationPlugin = require('./collaboration')
const ExportPlugin = require('./export')
const UploadPlugin = require('./upload')

const registerPlugin = async (server) => {
  await AuthPlugin(server)
  await AlbumPlugin(server)
  await PlaylistPlugin(server)
  await CollaborationPlugin(server)
  await ExportPlugin(server)
  await UploadPlugin(server)
}

module.exports = {
  registerPlugin
}
