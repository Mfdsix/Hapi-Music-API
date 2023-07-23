const tableName = 'collaborations'
const fkPlaylistName = 'fk_collaborations.playlist'
const fkUserName = 'fk_collaborations.user'
const fkStrategy = 'ON UPDATE CASCADE ON DELETE CASCADE'

exports.up = pgm => {
  pgm.addConstraint(tableName, fkPlaylistName, `FOREIGN(playlist_id) REFERENCES playlists(id) ${fkStrategy}`)
  pgm.addConstraint(tableName, fkUserName, `FOREIGN(user_id) REFERENCES users(id) ${fkStrategy}`)
}

exports.down = pgm => {
  pgm.dropConstraint(tableName, fkPlaylistName)
  pgm.dropConstraint(tableName, fkUserName)
}
