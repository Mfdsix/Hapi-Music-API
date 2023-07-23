const AuthPlugin = require('./auth')
const SongPlugin = require('./song')
const PlaylistPlugin = require('./playlist')

const registerPlugin = async (server) => {
  await AuthPlugin(server)
  await SongPlugin(server)
  await PlaylistPlugin(server)
}

module.exports = {
  registerPlugin
}
