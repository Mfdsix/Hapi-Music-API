const { hashPassword } = require('../src/utils/password-hash')
const { nanoid } = require('nanoid')

const id = 'user-system'

exports.up = pgm => {
  const username = 'music_system'
  const password = hashPassword(nanoid(16))
  const fullname = 'Music System'

  pgm.sql('INSERT INTO users VALUES ($1, $2, $3, $4)', [
    id, username, password, fullname
  ])
}

exports.down = pgm => {
  pgm.sql('DELETE FROM users WHERE id = $1', [
    id
  ])
}
