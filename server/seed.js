require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_shree_ganesh')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error(err));

const seed = async () => {
    try {
        // 1. Seed Admin
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({ username: 'admin', password: hashedPassword });
            console.log('Admin user created: admin / admin123');
        } else {
            console.log('Admin user already exists');
        }

        // 2. Seed Rooms
        const roomCount = await Room.countDocuments();
        if (roomCount === 0) {
            await Room.insertMany([
                { type: '2-Bed Room', price: 999, totalRooms: 6, description: 'Perfect for couples or two friends. AC, Attached Bathroom.' },
                { type: '3-Bed Room', price: 1199, totalRooms: 10, description: 'Ideal for small families. Spacious AC room.' },
                { type: '4-Bed Room', price: 1499, totalRooms: 16, description: 'Best for groups. Large space, AC, and all amenities.' }
            ]);
            console.log('Rooms seeded');
        } else {
            console.log('Rooms already exist');
        }

        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
