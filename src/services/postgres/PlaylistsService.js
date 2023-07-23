const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')
const { mapRowToModel } = require('../../utils/postgres')
const PlaylistSongsService = require('./PlaylistSongsService')
const PlaylistSongActivitiesService = require('./PlaylistSongActivitiesService')

const mapPlaylistRowToModel = (playlist) => {
  const username = playlist.username || playlist.owner
  delete playlist.owner

  return {
    ...mapRowToModel(playlist),
    username
  }
}

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
    this._playlistSongService = new PlaylistSongsService()
    this._activityService = new PlaylistSongActivitiesService()
  }

  async getAll ({
    owner
  }) {
    const result = await this._pool.query('SELECT id, name, owner FROM playlists WHERE owner = $1', [
      owner
    ])
    return result.rows.map(mapPlaylistRowToModel)
  }

  async getById (id, owner = null, includeSongs = false) {
    await this._checkOwner(id, owner)

    const query = {
      text: `
      SELECT p.*, u.username as owner FROM playlists p
      JOIN users u ON u.id = p.owner
      WHERE p.id = $1
      `,
      values: [id]
    }
    const result = await this._pool.query(query)
    const playlist = result.rows[0]

    if (includeSongs) {
      playlist.songs = await this._playlistSongService.getAll({
        playlistId: id
      })
    }

    return mapPlaylistRowToModel(playlist)
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

  async deleteById (id, owner = null) {
    await this._checkOwner(id, owner)

    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan')
    }
  }

  async addSong ({
    playlistId = undefined,
    songId = undefined,
    owner = undefined
  }) {
    await this._checkOwner(playlistId, owner)

    return await this._playlistSongService.create({
      playlistId,
      songId,
      owner
    })
  }

  async deleteSong ({
    playlistId = undefined,
    songId = undefined,
    owner = undefined
  }) {
    await this._checkOwner(playlistId, owner)

    return await this._playlistSongService.delete({
      playlistId,
      songId,
      owner
    })
  }

  async getActivities (playlistId, owner) {
    await this._checkOwner(playlistId, owner)

    return this._activityService.getAll({
      playlistId
    })
  }

  async _checkOwner (id, owner) {
    const query = {
      text: 'SELECT owner FROM playlists WHERE id = $1',
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
