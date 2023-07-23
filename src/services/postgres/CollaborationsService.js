const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class CollaborationsService {
  constructor () {
    this._pool = new Pool()
  }

  async create ({
    playlistId = undefined,
    userId = undefined
  }) {
    const id = `clb-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const result = await this._pool.query('INSERT INTO collaborations VALUES ($1, $2, $3, $4, $5)', [
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
}

module.exports = CollaborationsService
