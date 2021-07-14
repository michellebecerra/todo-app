const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://localhost:27017/todos', { useUnifiedTopology: true }, async function (err, client) {
  if (err) throw err

  db = client.db('todos');
    // add to collection every time so delete first

  await db.collection('todos').deleteMany();

  await db.collection('todos').insertMany([
      {done: true, dec: 'write code'},
      {done: true, dec: 'fix bugs'},
      {done: false, dec: 'profit'}

  ])

})

app.get('/', (req, res) => {
    res.json('did it work?');
})

app.get('/todos', async (req, res) => {
  
   try {

    const todos = await db.collection('todos').find().toArray();
   
    res.json(todos);

      } catch(e) {
        console.log(e.message);
    }
})

app.listen(3001, () => {
    console.log("work pls");
})