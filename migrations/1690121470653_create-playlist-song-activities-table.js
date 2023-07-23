exports.up = pgm => {
  pgm.createTable('playlist_song_activities', {
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
    user_id: {
      type: 'VARCHAR(25)',
      notNull: true
    },
    action: {
      type: 'VARCHAR(10)', // add, delete
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
  pgm.dropTable('playlist_song_activities')
}
