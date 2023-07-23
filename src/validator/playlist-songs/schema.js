const Joi = require('joi')

const PlaylistSongPostPayloadSchema = Joi.object({
  songId: Joi.string().required()
})

const PlaylistSongDeletePayloadSchema = Joi.object({
  songId: Joi.string().required()
})

module.exports = { PlaylistSongPostPayloadSchema, PlaylistSongDeletePayloadSchema }
