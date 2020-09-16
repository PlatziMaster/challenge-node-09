require('dotenv').config();
const express = require('express');
const MongoLib = require('./lib/mongo');
const mongo = new MongoLib();
const collection = 'quotes';

const { quoteIdSchema, createQuoteSchema } = require('./schema/quotes');

const app = express();

app.use(express.json());

const router = express.Router();
app.use('/quotes', router);

router.get('/', async (req, res) => {
  try {
    const data = await mongo.getAll(collection);
    res.status(200).json({
      data: data,
      message: "quotes listed"
    });
  } catch (error) {
    console.log(error);
  }

});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const val = quoteIdSchema.validate(id);
    if (val.error) {
      res.status(400).json({
        message: `bad request, ${val.error.details[0].message}`
      });
    }
    const data = await mongo.get(collection, id);
    res.status(200).json({
      data: data,
      message: "quote listed"
    });
  } catch (error) {
    console.log(error);
  }

});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const val = createQuoteSchema.validate(data);
    if (val.error) {
      res.status(400).json({
        message: `bad request, ${val.error.details[0].message}`
      });
    }

    const result = await mongo.create(collection, data);
    res.status(201).json({
      data: result,
      message: "quote created"
    });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const val = createQuoteSchema.validate(data);
    const val1 = quoteIdSchema.validate(id);
    if (val1.error || val.error) {
      const error = val.error ? val.error : val1.error
      res.status(400).json({
        message: `bad request, ${error.details[0].message}`
      });
    }
    const result = await mongo.update(collection, id, data);
    res.status(200).json({
      data: result,
      message: "quote updated"
    });
  } catch (error) {
    console.log(error);
  }

})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const val = quoteIdSchema.validate(id);
    if (val.error) {
      res.status(400).json({
        message: `bad request, ${val.error.details[0].message}`
      });
    }
    const result = await mongo.delete(collection, id);
    res.status(200).json({
      data: result,
      message: 'quote deleted'
    });
  } catch (error) {
    console.log(error);
  }
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Servidor funcionando http://localhost:${server.address().port}`);
});