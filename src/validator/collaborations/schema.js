const Joi = require('joi')

const CollaborationPostPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required()
})

const CollaborationDeletePayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required()
})

module.exports = {
  CollaborationPostPayloadSchema,
  CollaborationDeletePayloadSchema
}
