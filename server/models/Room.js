const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., '2-Bed', '3-Bed', '4-Bed'
    price: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    // You could track available rooms per date, but for simplicity we'll dynamic check or just store base inventory
    description: { type: String }
});

module.exports = mongoose.model('Room', RoomSchema);
