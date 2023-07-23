const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapRowToModel } = require('../../utils/postgres')

const mapSongRowToModel = (song) => {
  const albumId = song.album_id
  delete song.album_id

  return {
    ...mapRowToModel(song),
    albumId
  }
}

class SongsService {
  constructor () {
    this._pool = new Pool()
  }

  async getAll ({
    title = undefined,
    performer = undefined,
    albumId = undefined,
    where = undefined
  }) {
    const filter = []
    let whereQuery = null

    if (where) {
      whereQuery = `WHERE ${where}`
    } else {
      if (title) filter.push(`title ilike '%${title}%'`)
      if (performer) filter.push(`performer ilike '%${performer}%'`)
      if (albumId) filter.push(`album_id = '${albumId}'`)
      whereQuery = filter.length > 0 ? ' WHERE ' + filter.join(' AND ') : ''
    }

    const result = await this._pool.query(`SELECT id, title, performer FROM songs
    ${whereQuery}`)
    return result.rows.map(mapSongRowToModel)
  }

  async getById (id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan')
    }

    return result.rows.map(mapSongRowToModel)[0]
  }

  async create ({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async updateById (id, { title, year, genre, performer, duration, albumId }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Lagu. Id tidak ditemukan')
    }
  }

  async deleteById (id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan')
    }
  }
}

module.exports = SongsService
