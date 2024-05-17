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

module.exports = router;