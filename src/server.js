const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const dbUrl = process.env.BD_URL;

MongoClient.connect(dbUrl, {
  useUnifiedTopology: true
}, (err, database) => {
  if (err) return console.log(err);
  console.log('Connected to Database');
});

const app = express();

app.get('/', (request, response) => {
  response.send('¡Hola Mundo!');
});

app.get('/quotes', (resquest, response) => {
  response.json({ data: 'ok' });
});

app.post('/quotes', (request, response) => {
  response.json({ data: 'post' });
});

app.put('/quotes', (resquest, response) => {
  response.json({ data: 'put' });
})

app.delete('/quotes', (resquest, response) => {
  response.json({ data: 'delete' });
})

app.listen(8000, () => {
  console.log('Servidor funcionando http://localhost:8000');
});