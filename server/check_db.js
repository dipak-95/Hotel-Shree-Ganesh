const mongoose = require('mongoose');
require('dotenv').config();
const Room = require('./models/Room');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_shree_ganesh')
    .then(async () => {
        console.log('Connected to DB');
        const count = await Room.countDocuments();
        console.log(`Total Rooms in DB: ${count}`);
        const rooms = await Room.find({});
        console.log('Rooms:', JSON.stringify(rooms, null, 2));
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
