const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/pakmobiles', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
// Chat and Message schemas
const chatSchema = new mongoose.Schema({
    chatId: Number,
    title: String,
    avatarFilename: String
});

const messageSchema = new mongoose.Schema({
    messageId: Number,
    chatId: Number,
    text: String,
    sender: String
});
const Chat = mongoose.model('chats', chatSchema);
const Message = mongoose.model('messages', messageSchema);
const User = mongoose.model('users', userSchema);

// Routes
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send('Error creating user');
    }
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request body:', req.body); // Add this line
    try {
        
      const user = await User.findOne({ email, password });
      console.log('Found user:', user); // Add this line
      if (user) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (error) {
      res.status(500).send('Error during login');
    }
  });

  
// Get all chats
app.get('/chats', async (req, res) => {
    try {
        const chats = await Chat.find();
        console.log('Retrieved chats:', chats); // Log retrieved chats
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error); // Log error
        res.status(500).json({ error: 'Error fetching chats' });
    }
});



// Get messages for a specific chat
app.get('/messages/:chatId', async (req, res) => {
    const chatId = req.params.chatId;
    try {
        const messages = await Message.find({ chatId });
        console.log(`Retrieved messages for chatId ${chatId}:`, messages); // Log retrieved messages
        res.json(messages);
    } catch (error) {
        console.error(`Error fetching messages for chatId ${chatId}:`, error); // Log error
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Get messages for a specific user
app.get('/messages/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const messages = await Message.aggregate([
        {
          $lookup: {
            from: 'chats',
            localField: 'chatId',
            foreignField: 'chatId',
            as: 'chat',
          },
        },
        {
          $match: {
            $or: [
              { 'chat.sender_id': parseInt(userId) },
              { 'chat.receiver_id': parseInt(userId) },
            ],
          },
        },
        {
          $project: {
            messageId: 1,
            chatId: 1,
            message: 1,
            sender_id: {
              $cond: {
                if: { $eq: ['$chat.sender_id', parseInt(userId)] },
                then: parseInt(userId),
                else: '$chat.receiver_id',
              },
            },
          },
        },
      ]);
      console.log(`Retrieved messages for userId ${userId}:`, messages);
      res.json(messages);
    } catch (error) {
      console.error(`Error fetching messages for userId ${userId}:`, error);
      res.status(500).json({ error: 'Error fetching messages' });
    }
  });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
