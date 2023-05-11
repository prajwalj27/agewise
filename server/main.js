import express from 'express';
import cors from 'cors';

import './config/db.js';
// import usersRoutes from "./routes/users.js"
// import postsRoutes from "./routes/posts.js"

const app = express();

const PORT = process.env.PORT || 8080;

const chatRoom0 = [
  {
    id: 0,
    author: 'Hrishi',
    message: 'Hey guys!!',
    datetime: '11/05/2023 02:46',
  },
  {
    id: 1,
    author: 'Hrishi',
    message: 'MI vs CSK Dekha??👀',
    datetime: '11/05/2023 02:49',
  },
  {
    id: 2,
    author: 'Aryan',
    message:
      'Mumbai indians ka game bohot acha tha! maja hi aa gaya!! 🔥🔥🔥🔥🔥🔥',
    datetime: '11/05/2023 02:50',
  },
  {
    id: 3,
    author: 'Kartik',
    message: 'Loved Dhoniji ki batting yesterday 💪',
    datetime: '11/05/2023 02:50',
  },
  {
    id: 4,
    author: 'Prajwal',
    message: 'Hey everyone!',
    datetime: '11/05/2023 03:00',
  },
  {
    id: 5,
    author: 'Prajwal',
    message: '👋',
    datetime: '11/05/2023 03:00',
  },
];
const chatRoom1 = [];
const chatRoom2 = [];
const chatRoom3 = [];

app.use(express.json());
app.use(cors());

// app.use("/api/users", usersRoutes)
// app.use("/api/posts", postsRoutes)

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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
