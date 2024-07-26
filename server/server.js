const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const uri = 'your-mongodb-connection-string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

client.connect(err => {
    if (err) {
        console.error('Failed to connect to the database', err);
        process.exit(1);
    }
    db = client.db('textApp');
    console.log('Connected to database');
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
    const { text } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const datetime = new Date();

    try {
        await db.collection('texts').insertOne({ text, datetime, ip });
        res.status(200).send('Text submitted successfully!');
    } catch (error) {
        console.error('Failed to submit text', error);
        res.status(500).send('Failed to submit text');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});