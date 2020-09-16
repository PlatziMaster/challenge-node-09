const joi = require('joi')

const quoteIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createQuoteSchema = joi.object({
  name: joi.string().max(100).required(),
  location: joi.string().max(100).required(),
  date: joi.date().required(),
  type: joi.string().required()
})

module.exports = {
  quoteIdSchema,
  createQuoteSchema
}