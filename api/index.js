const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const SECRET = process.env.JWT_SECRET || 'super-secret-key-123';

// --- MOCK DATABASE ---
let users = [];
let rooms = [
  { 
    id: 1, 
    title: 'Luxury Villa in Goa', 
    price: 45000, 
    location: 'Anjuna, Goa', 
    description: 'A stunning villa with a private pool and walking distance to the beach.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    title: 'Modern Apartment in Mumbai', 
    price: 35000, 
    location: 'Bandra, Mumbai', 
    description: 'Compact yet stylish apartment in the heart of the city.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    title: 'Cozy Homestay in Manali', 
    price: 15000, 
    location: 'Old Manali, HP', 
    description: 'Experience the mountains in this traditional wooden cottage.',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, 
    title: 'Premium Studio in Bangalore', 
    price: 22000, 
    location: 'Indiranagar, Bangalore', 
    description: 'Fully furnished studio perfect for tech professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, 
    title: 'Penthouse with City View', 
    price: 85000, 
    location: 'Gurugram, Haryana', 
    description: 'Ultra-luxurious penthouse with a panoramic view of the skyline.',
    imageUrl: 'https://images.unsplash.com/photo-1512918766671-5600418b76d0?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 6, 
    title: 'Heritage Suite in Jaipur', 
    price: 30000, 
    location: 'Pink City, Jaipur', 
    description: 'Stay in a piece of history with modern royal comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800'
  }
];

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User already exists' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id }, SECRET);
  res.json({ token, user: { id: newUser.id, name, email } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token, user: { id: user.id, name: user.name, email } });
});

// --- ROOM ROUTES ---
app.get('/api/rooms', (req, res) => {
  const { query } = req.query; // Changed parameter name to generic 'query'
  if (query) {
    const searchTerm = query.toLowerCase();
    const filtered = rooms.filter(r => 
      r.location.toLowerCase().includes(searchTerm) || 
      r.title.toLowerCase().includes(searchTerm) ||
      r.description.toLowerCase().includes(searchTerm)
    );
    return res.json(filtered);
  }
  res.json(rooms);
});

app.post('/api/rooms', (req, res) => {
  // Simple auth check could be added here
  const newRoom = { id: rooms.length + 1, ...req.body };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// --- EXPORT FOR VERCEL ---
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
