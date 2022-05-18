const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y8teq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('task_control').collection('task');

        //get method
        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })

        //post method
        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await productCollection.insertOne(newTask);
            res.send(result);
        })
    }
    finally { }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From Task Control')
})

app.listen(port, () => {
    console.log(`Task Control app listening on port ${port}`)
})