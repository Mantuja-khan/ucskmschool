import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    blogs: [],
    videos: [],
    books: [],
    gallery: []
  }));
}

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get('/api/:collection', (req, res) => {
  try {
    const db = readDB();
    res.json(db[req.params.collection] || []);
  } catch (error) {
    res.status(500).json({ error: 'Database read error' });
  }
});

app.post('/api/:collection', (req, res) => {
  try {
    const db = readDB();
    const collection = req.params.collection;
    if (!db[collection]) db[collection] = [];
    
    // Quick handle for arrays or single items
    const newItem = { id: Date.now().toString(), ...req.body };
    db[collection].push(newItem);
    writeDB(db);
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Database write error' });
  }
});

app.delete('/api/:collection/:id', (req, res) => {
  try {
    const db = readDB();
    const collection = req.params.collection;
    if (!db[collection]) return res.status(404).json({ error: 'Not found' });
    
    db[collection] = db[collection].filter(i => i.id !== req.params.id);
    writeDB(db);
    
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database delete error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend API running on http://localhost:${PORT}`));
