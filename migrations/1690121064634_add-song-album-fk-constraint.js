const tableName = 'songs'
const fkName = 'fk_songs.album'

exports.up = pgm => {
  pgm.addConstraint(tableName, fkName, 'FOREIGN KEY(album_id) REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropConstraint(tableName, fkName)
}
