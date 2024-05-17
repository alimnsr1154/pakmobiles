const express = require("express");
const connectDB = require("../db"); // Import the function to connect to MongoDB
const mongoose = require("mongoose");

const router = express.Router();

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  time: Date,
});

const Message = mongoose.model("Message", messageSchema);

router.get('/messages/:email', async (req, res) => {
    const email = req.params.email;
    try {
      const messages = await Message.find({
        $or: [{ sender: email }, { receiver: email }],
      });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

router.post("/messages", async (req, res) => {
  const { sender, receiver, text } = req.body;
  const newMessage = new Message({
    sender,
    receiver,
    text,
    time: new Date(),
  });

  try {
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/receivers', async (req, res) => {
    try {
      const receivers = await Message.distinct('receiver');
      res.json(receivers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

module.exports = router;
