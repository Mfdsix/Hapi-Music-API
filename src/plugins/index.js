const AuthPlugin = require('./auth')
const SongPlugin = require('./song')
const PlaylistPlugin = require('./playlist')
const CollaborationPlugin = require('./collaboration')
const ExportPlugin = require('./export')
const UploadPlugin = require('./upload')

const registerPlugin = async (server) => {
  await AuthPlugin(server)
  await SongPlugin(server)
  await PlaylistPlugin(server)
  await CollaborationPlugin(server)
  await ExportPlugin(server)
  await UploadPlugin(server)
}

module.exports = {
  registerPlugin
}
