const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    roomType: { type: String, required: true }, // Should match Room.type
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfRooms: { type: Number, default: 1 },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Confirmed' }, // Offline bookings are confirmed by default
    source: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
