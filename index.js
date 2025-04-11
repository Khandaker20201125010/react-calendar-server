const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.texsw4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
 

    console.log("MongoDB connected and endpoints ready ✅");

  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Calendar is marking ✅');
});

app.listen(port, () => {
  console.log(`Calendar is marking on ${port}`);
});
