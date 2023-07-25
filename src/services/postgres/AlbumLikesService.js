const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')

class AlbumLikesService {
  constructor () {
    this._pool = new Pool()
  }

  async countLikes (albumId) {
    const query = {
      text: 'SELECT COUNT(id) as count FROM album_likes where album_id = $1',
      values: [albumId]
    }

    const result = await this._pool.query(query)

    return result.rows?.[0]?.count || 0
  }

  async addLike ({
    albumId,
    userId
  }) {
    const id = `alk-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO album_likes VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userId, albumId, createdAt, updatedAt]
    }
    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Like gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async removeLike ({
    albumId,
    userId
  }) {
    const query = {
      text: 'DELETE FROM album_likes WHERE album_id = $1 AND user_id = $2 RETURNING ID',
      values: [albumId, userId]
    }
    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Like gagal dihapus')
    }
  }
}

module.exports = AlbumLikesService
