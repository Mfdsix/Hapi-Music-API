exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    genre: {
      type: 'VARCHAR(30)',
      notNull: true
    },
    performer: {
      type: 'VARCHAR(30)',
      notNull: true
    },
    duration: {
      type: 'INTEGER',
      notNull: false
    },
    album_id: {
      type: 'VARCHAR(21)',
      notNull: false,
      options: {
        constraints: {
          foreignKeys: {
            references: 'albums',
            columns: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        }
      }
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
  pgm.dropTable('songs')
}
