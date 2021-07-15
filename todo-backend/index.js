const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

const MongoClient = require('mongodb').MongoClient;
let dbdb;

MongoClient.connect('mongodb://localhost:27017/todos', { useUnifiedTopology: true }, async function (err, client) {
  if (err) throw err

  dbdb = client.db('todos');

  // add to collection every time so delete first
  await dbdb.collection('todos').deleteMany();

  await dbdb.collection('todos').insertMany([
      {done: true, dec: 'write code'},
      {done: true, dec: 'fix bugs'},
      {done: false, dec: 'profit'}

  ]);

});

app.get('/', (req, res) => {
    res.json('If you are getting this it (hitting the BE) worked.');
})

app.get('/todos', async (req, res) => {

    const todos = await dbdb.collection('todos').find().toArray();
   
    res.json(todos);
})

app.listen(3001, () => {
    console.log("work pls");
})