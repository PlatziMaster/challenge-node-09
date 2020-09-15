const joi = require('@hapi/joi')

const quoteIdSchema = joi.string().regex(/^[0-9a-fA-f]/);

const createQuoteSchema = {
  name: joi.string().max(100).required(),
  location: joi.string().max(100).required(),
  date: joi.date().required(),
  type: joi.string().required()
}

module.exports = {
  quoteIdSchema,
  createQuoteSchema
}