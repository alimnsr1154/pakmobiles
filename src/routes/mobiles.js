const express = require('express');
const connectDB = require('../db'); // Import the function to connect to MongoDB

const router = express.Router();

// Endpoint to fetch all mobiles
router.get('/api/mobiles', async (req, res) => {
    try {
        const db = await connectDB();
        const mobiles = await db.collection('mobiles').find({}).toArray();
        res.json(mobiles);
    } catch (err) {
        console.error('Error fetching mobiles:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch unique brands
router.get('/api/mobiles/brands', async (req, res) => {
    try {
        const db = await connectDB();
        const brands = await db.collection('mobiles').distinct('brand');
        res.json(brands);
    } catch (err) {
        console.error('Error fetching brands:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint to fetch all prices
router.get('/api/mobiles/prices', async (req, res) => {
    try {
        const db = await connectDB();
        const mobiles = await db.collection('mobiles').find({}).toArray();
        const prices = mobiles.map(mobile => mobile.price);
        res.json(prices);
    } catch (err) {
        console.error('Error fetching prices:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Endpoint to update a mobile's rating
router.put('/api/mobiles/:name', async (req, res) => {
    try {
        const db = await connectDB();
        const updatedMobile = await db.collection('mobiles').findOneAndUpdate(
            { name: req.params.name },
            { $set: { rating: req.body.rating } },
            { returnOriginal: false }
        );
        res.json(updatedMobile.value);
    } catch (err) {
        console.error('Error updating mobile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch a single mobile by name
router.get('/api/mobiles/:name', async (req, res) => {
    try {
        const db = await connectDB();
        const mobile = await db.collection('mobiles').findOne({ name: req.params.name });
        if (!mobile) {
            res.status(404).json({ error: 'Mobile not found' });
        } else {
            res.json(mobile);
        }
    } catch (err) {
        console.error('Error fetching mobile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch messages between two users
router.get('/api/messages/:user1/:user2', async (req, res) => {
    try {
        const db = await connectDB();
        const messages = await db.collection('messages').find({
            $or: [
                { sender: req.params.user1, receiver: req.params.user2 },
                { sender: req.params.user2, receiver: req.params.user1 }
            ]
        }).sort({ time: 1 }).toArray(); // Sort by time in ascending order
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to send a message from one user to another
router.post('/api/messages', async (req, res) => {
    try {
        const db = await connectDB();
        const message = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            text: req.body.text,
            time: new Date()
        };
        await db.collection('messages').insertOne(message);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;