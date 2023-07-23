const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')

class PlaylistSongActivitiesService {
  constructor () {
    this._pool = new Pool()
  }

  async getAll ({
    playlistId = undefined
  }) {
    const result = await this._pool.query(`SELECT u.username, s.title, a.action, a.created_at as time FROM playlist_song_activities a
    JOIN users u ON u.id = a.user_id
    JOIN songs s ON s.id = a.song_id
    WHERE a.playlist_id = $1
    ORDER BY a.created_at ASC
    `, [
      playlistId
    ])
    return result.rows
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
