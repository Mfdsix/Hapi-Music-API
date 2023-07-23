const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const { mapRowToModel } = require('../../utils/postgres')

class PlaylistSongActivitiesService {
  constructor () {
    this._pool = new Pool()
  }

  async getAll ({
    playlistId = undefined
  }) {
    const result = await this._pool.query('SELECT id, playlist_id, song_id, user_id, action FROM playlist_song_activities WHERE playlist_id = $1', [
      playlistId
    ])
    return result.rows.map(mapRowToModel)
  }

  async create ({ playlistId, songId, userId, action }) {
    const id = `psa-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, playlistId, songId, userId, action, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Aktivitas gagal ditambahkan')
    }

    return result.rows[0].id
  }
}

module.exports = PlaylistSongActivitiesService
