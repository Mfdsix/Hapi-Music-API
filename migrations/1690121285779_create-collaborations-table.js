exports.up = pgm => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(25)',
      primaryKey: true
    },
    playlist_id: {
      type: 'VARCHAR(25)',
      notNull: true
    },
    user_id: {
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
  pgm.dropTable('collaborations')
}
