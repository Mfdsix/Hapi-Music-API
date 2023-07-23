const tableName = 'playlist_song_activities'
const fkPlaylistName = 'fk_playlist_song_activities.playlist'
const fkSongName = 'fk_playlist_song_activities.song'
const fkUserName = 'fk_playlist_song_activities.user'
const fkStrategy = 'ON UPDATE CASCADE ON DELETE CASCADE'

exports.up = pgm => {
  pgm.addConstraint(tableName, fkPlaylistName, `FOREIGN KEY(playlist_id) REFERENCES playlists(id) ${fkStrategy}`)
  pgm.addConstraint(tableName, fkSongName, `FOREIGN KEY(song_id) REFERENCES songs(id) ${fkStrategy}`)
  pgm.addConstraint(tableName, fkUserName, `FOREIGN KEY(user_id) REFERENCES users(id) ${fkStrategy}`)
}

exports.down = pgm => {
  pgm.dropConstraint(tableName, fkPlaylistName)
  pgm.dropConstraint(tableName, fkSongName)
  pgm.dropConstraint(tableName, fkUserName)
}
