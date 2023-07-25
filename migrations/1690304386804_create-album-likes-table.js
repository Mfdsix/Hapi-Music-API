exports.up = pgm => {
  pgm.createTable('album_likes', {
    id: {
      type: 'VARCHAR(25)',
      primaryKey: true
    },
    user_id: {
      type: 'VARCHAR(25)',
      notNull: true
    },
    album_id: {
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
  pgm.dropTable('album_likes')
}
