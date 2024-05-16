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

module.exports = router;