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
const Room = require('./models/Room'); // Added Room model import
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_shree_ganesh')
    .then(async () => {
        console.log('MongoDB Connected');

        try {
            // 1. Auto-Seed Admin
            const adminExists = await User.findOne({ username: 'admin' });
            if (!adminExists) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('admin123', salt);
                const admin = new User({ username: 'admin', password: hashedPassword });
                await admin.save();
                console.log('✅ Default Admin Created');
            } else {
                console.log('ℹ️ Admin already exists');
            }

            // 2. Auto-Seed Rooms (If empty)
            const roomCount = await Room.countDocuments();
            console.log('Current Room Count:', roomCount);
            if (roomCount === 0) {
                const defaultRooms = [
                    {
                        type: 'Deluxe Room',
                        price: 2500,
                        description: 'Spacious room with king size bed and city view',
                        totalRooms: 10,
                        images: ['/images/room-1.jpg', '/images/room-2.jpg', '/images/room-3.jpg']
                    },
                    {
                        type: 'Super Deluxe',
                        price: 3500,
                        description: 'Premium amenities with balcony and sea view',
                        totalRooms: 8,
                        images: ['/images/room-2.jpg', '/images/room-4.jpg', '/images/room-5.jpg']
                    },
                    {
                        type: 'Family Suite',
                        price: 5000,
                        description: 'Two bedrooms with living area, perfect for families',
                        totalRooms: 5,
                        images: ['/images/room-3.jpg', '/images/room-1.jpg', '/images/room-5.jpg']
                    }
                ];
                await Room.insertMany(defaultRooms);
                console.log('✅ Default Rooms Created');
            } else {
                console.log('ℹ️ Rooms already exist');
            }
        } catch (seedError) {
            console.error('❌ Seeding Error:', seedError);
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Health Check & Debug Endpoint
app.get('/api/health', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const roomCount = await Room.countDocuments();
        const dbState = mongoose.connection.readyState; // 0: disconnected, 1: connected
        const stateMap = { 0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting' };

        res.json({
            status: 'ok',
            database: stateMap[dbState],
            users: userCount,
            rooms: roomCount,
            env_mongo: process.env.MONGO_URI ? 'Set' : 'Missing'
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hotel Shree Ganesh API is running');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
