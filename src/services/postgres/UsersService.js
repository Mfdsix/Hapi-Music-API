const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const { hashPassword, comparePassword } = require('../../utils/password-hash')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthenticationError = require('../../exceptions/AuthenticationError')

class UsersService {
  constructor () {
    this._pool = new Pool()
  }

  async addUser ({ username, password, fullname }) {
    const existingUser = await this.checkUsername(username)

    if (existingUser) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')
    }

    const id = `user-${nanoid(16)}`
    const hashedPassword = hashPassword(password)
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async checkUsername (username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (result.rows.length > 0) {
      return result.rows[0]
    }

    return null
  }

  async getUserById (userId) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan')
    }

    return result.rows[0]
  }

  async verifyUserCredential (username, password) {
    const checkUser = await this.checkUsername(username)

    if (checkUser) {
      const { id, password: hashedPassword } = checkUser
      const match = comparePassword(password, hashedPassword)

      if (match) return id
    }

    throw new AuthenticationError('Kredensial yang Anda berikan salah')
  }
}

module.exports = UsersService
