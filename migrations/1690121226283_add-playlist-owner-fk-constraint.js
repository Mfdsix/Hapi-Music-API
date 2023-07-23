const tableName = 'playlists'
const fkName = 'fk_playlists.owner'

exports.up = pgm => {
  pgm.addConstraint(tableName, fkName, 'FOREIGN KEY(owner) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropConstraint(tableName, fkName)
}
