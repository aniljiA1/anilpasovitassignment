require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


const PORT = process.env.PORT || 'https://anilpasovitbackend.onrender.com';

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});


connectDB(process.env.MONGO_URI || 'mongodb+srv://aniljiA1:anil12345@cluster0.9wr0ivl.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
