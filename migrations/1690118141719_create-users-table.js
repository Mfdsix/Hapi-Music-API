exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    password: {
      type: 'VARCHAR(150)',
      notNull: true
    },
    fullname: {
      type: 'VARCHAR(50)',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('users')
}
