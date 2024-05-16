const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("pakmobiles");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connect;
