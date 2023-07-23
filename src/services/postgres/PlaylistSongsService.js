const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapRowToModel } = require('../../utils/postgres')
const SongsService = require('./SongsService')
const PlaylistSongActivitiessService = require('./PlaylistSongActivitiesService')

class PlaylistSongsService {
  constructor () {
    this._pool = new Pool()
    this._songsService = new SongsService()
    this._activitiesService = new PlaylistSongActivitiessService()
  }

  async getAll ({
    playlistId = undefined
  }) {
    const songs = await this._songsService.getAll({
      where: `id IN SELECT song_id FROM playlist_songs WHERE playlist_id = '${playlistId}'`
    })
    return songs.map(mapRowToModel)
  }

  async create ({ playlistId, songId, owner }) {
    const id = `pls-${nanoid(16)}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlistId, songId, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan')
    }
    await this._activitiesService.create({
      playlistId,
      songId,
      userId: owner,
      action: 'add'
    })

    return result.rows[0].id
  }

  async delete ({
    playlistId,
    songId,
    owner
  }) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Lagu tidak ditemukan')
    }
    await this._activitiesService.create({
      playlistId,
      songId,
      userId: owner,
      action: 'delete'
    })
  }
}

module.exports = PlaylistSongsService
