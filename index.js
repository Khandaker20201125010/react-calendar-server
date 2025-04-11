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
        const calendarCollection = client.db("Calendar").collection("events");
        app.get('/events', async (req, res) => {
            const events = await calendarCollection.find().toArray();
            res.send(events);
        });
        app.post('/events', async (req, res) => {
            const event = req.body;
            const result = await calendarCollection.insertOne(event);
            res.send(result);
        });
        app.put('/events/:id', async (req, res) => {
            const id = req.params.id;
            const updatedEvent = req.body;

            const result = await calendarCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedEvent }
            );

            res.send(result);
        });
        app.delete('/events/:id', async (req, res) => {
            const id = req.params.id;
            const result = await calendarCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        console.log("MongoDB connected and endpoints ready ✅");

    } finally {
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Calendar is marking');
});

app.listen(port, () => {
    console.log(`Calendar is marking on ${port}`);
});
