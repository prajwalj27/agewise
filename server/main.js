import express from 'express';
import cors from 'cors';

import './config/db.js';
import {
  chatRoom0,
  chatRoom1,
  chatRoom2,
  chatRoom3,
  stories,
} from './constants.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to AgeWise!');
});

app.get('/api/chats/:id', async (req, res) => {
  const chatId = req.params.id;
  // console.log(typeof chatId);
  try {
    chatId === '0' && res.status(200).json(chatRoom0);
    chatId === '1' && res.status(200).json(chatRoom1);
    chatId === '2' && res.status(200).json(chatRoom2);
    chatId === '3' && res.status(200).json(chatRoom3);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/chats/new/:id', async (req, res) => {
  const newMessage = req.body;
  const chatId = req.params.id;
  try {
    chatId === '0' && chatRoom0.push(newMessage);
    chatId === '1' && chatRoom1.push(newMessage);
    chatId === '2' && chatRoom2.push(newMessage);
    chatId === '3' && chatRoom3.push(newMessage);

    res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/stories', async (req, res) => {
  try {
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/stories/:id', async (req, res) => {
  const storyId = req.params.id;
  try {
    res.status(200).json(stories[storyId]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/stories/new', async (req, res) => {
  const newStory = req.body;

  try {
    stories.push(newStory);
    res.status(200).json({ message: 'Story Posted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
