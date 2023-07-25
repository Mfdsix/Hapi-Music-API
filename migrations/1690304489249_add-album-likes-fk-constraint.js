const tableName = 'album_likes'
const fkUserName = 'fk_album_likes.user'
const fkAlbumName = 'fk_album_likes.album'

exports.up = pgm => {
  pgm.addConstraint(tableName, fkUserName, 'FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE')
  pgm.addConstraint(tableName, fkAlbumName, 'FOREIGN KEY(album_id) REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropConstraint(tableName, fkUserName)
  pgm.dropConstraint(tableName, fkAlbumName)
}
