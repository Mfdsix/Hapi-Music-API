const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')
const UsersService = require('./UsersService')

class CollaborationsService {
  constructor () {
    this._pool = new Pool()
    this._userService = new UsersService()
  }

  async create ({
    playlistId = undefined,
    userId = undefined
  }) {
    await this._userService.getById(userId)

    const id = `clb-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const result = await this._pool.query('INSERT INTO collaborations VALUES ($1, $2, $3, $4, $5) RETURNING id', [
      id, playlistId, userId, createdAt, updatedAt
    ])

    if (!result.rows[0].id) {
      throw new InvariantError('Kolaborator gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async delete ({
    playlistId = undefined,
    userId = undefined
  }) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Kolaborator gagal dihapus. Data tidak ditemukan')
    }
  }

  async checkAccess ({ playlistId, userId }) {
    const query = {
      text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
    }

    return result.rows[0]
  }
}

module.exports = CollaborationsService
