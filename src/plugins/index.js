const AuthPlugin = require('./auth')
const SongPlugin = require('./song')
const PlaylistPlugin = require('./playlist')
const CollaborationPlugin = require('./collaboration')

const registerPlugin = async (server) => {
  await AuthPlugin(server)
  await SongPlugin(server)
  await PlaylistPlugin(server)
  await CollaborationPlugin(server)
}

module.exports = {
  registerPlugin
}
