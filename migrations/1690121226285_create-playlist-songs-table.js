exports.up = pgm => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true
    },
    playlist_id: {
      type: 'VARCHAR(25)',
      notNull: true
    },
    song_id: {
      type: 'VARCHAR(25)',
      notNull: true
    },
    created_at: {
      type: 'TEXT',
      notNull: true
    },
    updated_at: {
      type: 'TEXT',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('playlist_songs')
}
