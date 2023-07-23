const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const saltRounds = 10
  return bcrypt.hashSync(password, saltRounds)
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  hashPassword,
  comparePassword
}
