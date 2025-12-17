require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
// Database Connection
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_shree_ganesh')
    .then(async () => {
        console.log('MongoDB Connected');

        // Auto-Seed Admin
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            const admin = new User({ username: 'admin', password: hashedPassword });
            await admin.save();
            console.log('Using Default Admin: admin / admin123');
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Hotel Shree Ganesh API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
