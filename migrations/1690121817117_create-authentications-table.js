exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'VARCHAR(150)',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('authentications')
}
