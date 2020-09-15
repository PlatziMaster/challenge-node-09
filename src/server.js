require('dotenv').config();
const express = require('express');
const joi = require('@hapi/joi')
const MongoLib = require('./lib/mongo');
const mongo = new MongoLib();
const collection = 'quotes';

const { createQuoteSchema } = require('./schema/quotes')

const app = express();

const router = express.Router();
app.use('/quotes', router);
app.use(express.json());

app.get('/', async (req, res) => {
  const { query } = req
  try{
    const data = await mongo.getAll(collection, { query })
    res.status(200).json({ 
      data: data,
      message: "quotes listed"
    });
  }catch(error){
    console.log(error);
  }
  
});

app.post('/', async (req, res) => {
  const data = req.body;
  try{
    createQuoteSchema.validate(data);
    const result = await mongo.create(collection, data);
    res.status(201).json({ 
      data: result,
      message: "quote created"
    });
  }catch(error){
    console.log(error);
  }
});

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await mongo.update(collection, id, data);
  res.status(200).json({ 
    data: result ,
    message: "quote updated"
  });
})

app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ data: 'delete' });
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Servidor funcionando http://localhost:${server.address().port}`);
});