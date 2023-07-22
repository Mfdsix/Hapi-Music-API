const Joi = require('joi')

const currentYear = new Date().getFullYear()

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required().min(1800).max(currentYear)
})

module.exports = { AlbumPayloadSchema }
