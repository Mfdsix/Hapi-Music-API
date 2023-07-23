const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')
const { mapRowToModel } = require('../../utils/postgres')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getAll (owner) {
    const result = await this._pool.query('SELECT id, name, owner FROM playlists WHERE owner = $1', [
      owner
    ])
    return result.rows.map(mapRowToModel)
  }

  async getById (id, owner = null, includeSongs = false) {
    const playlist = await this._checkOwner(id, owner)

    if (includeSongs) {
      // TODO:
    //   playlist.songs = await this._songService.getAll({
    //     albumId: id
    //   })
    }

    return playlist
  }

  async create ({ name, owner }) {
    const id = `ply-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, owner, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async updateById (id, owner = null, { name }) {
    await this._checkOwner(id, owner)

    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE playlists SET name = $1, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Playlist. Id tidak ditemukan')
    }
  }

  async deleteById (id, owner = null) {
    await this._checkOwner(id, owner)

    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan')
    }
  }

  async _checkOwner (id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan')
    }
    const note = result.rows[0]
    if (note.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
    }

    return result.rows[0]
  }
}

module.exports = PlaylistsService
