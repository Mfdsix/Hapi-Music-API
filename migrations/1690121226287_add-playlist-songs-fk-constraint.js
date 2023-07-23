const tableName = 'playlist_songs'
const fkPlaylistName = 'fk_playlist_songs.playlist'
const fkSongName = 'fk_playlist_songs.song'
const fkStrategy = 'ON UPDATE CASCADE ON DELETE CASCADE'

exports.up = pgm => {
  pgm.addConstraint(tableName, fkPlaylistName, `FOREIGN KEY(playlist_id) REFERENCES playlists(id) ${fkStrategy}`)
  pgm.addConstraint(tableName, fkSongName, `FOREIGN KEY(song_id) REFERENCES songs(id) ${fkStrategy}`)
}

exports.down = pgm => {
  pgm.dropConstraint(tableName, fkPlaylistName)
  pgm.dropConstraint(tableName, fkSongName)
}
