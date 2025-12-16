const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Get all bookings (Admin)
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create Booking (Online/Offline) -> Updates Room Availability Logic?
// Note: "Online availability" usually means (Total - Booked for dates).
// We'll simplify: If a booking is confirmed, it counts against quota?
// For now, let's just save the booking. Availability check should happen BEFORE confirming.
// Create Booking (Online = Inquiry, Offline = Confirmed)
exports.createBooking = async (req, res) => {
    try {
        const { guestName, phone, email, roomType, checkInDate, checkOutDate, numberOfRooms, source } = req.body;

        // 1. Validate Dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkIn < today) {
            return res.status(400).json({ message: "Cannot book dates in the past." });
        }
        if (checkOut <= checkIn) {
            return res.status(400).json({ message: "Check-out date must be after check-in date." });
        }

        // 2. Strict Availability Check (For BOTH Offline and Online)
        // Even for Inquiries (Pending), we must check if the dates are already fully booked by Confirmed guests.
        const room = await Room.findOne({ type: roomType });
        if (!room) return res.status(404).json({ message: "Room type not found." });

        const conflictingBookings = await Booking.find({
            roomType,
            status: 'Confirmed', // Only count CONFIRMED bookings against the limit
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gt: checkIn }
        });

        const reservedRooms = conflictingBookings.reduce((sum, booking) => sum + booking.numberOfRooms, 0);

        // If 'Confirmed' bookings already take up all space (or not enough left for this request), reject Inquiry
        if (reservedRooms + Number(numberOfRooms) > room.totalRooms) {
            return res.status(400).json({ message: `Dates already fully booked. Only ${Math.max(0, room.totalRooms - reservedRooms)} rooms left.` });
        }

        let status = 'Pending'; // Default for Online
        if (source === 'Offline') {
            status = 'Confirmed';
        }

        const newBooking = new Booking({
            guestName, phone, email, roomType, checkInDate, checkOutDate, numberOfRooms, source, status
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Approve Booking (Admin)
exports.approveBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.status === 'Confirmed') return res.status(400).json({ message: 'Booking already confirmed' });

        // Check Availability before confirming
        const room = await Room.findOne({ type: booking.roomType });
        if (!room) return res.status(404).json({ message: "Room type not found." });

        const conflictingBookings = await Booking.find({
            roomType: booking.roomType,
            status: 'Confirmed',
            checkInDate: { $lt: booking.checkOutDate },
            checkOutDate: { $gt: booking.checkInDate }
        });

        const reservedRooms = conflictingBookings.reduce((sum, b) => sum + b.numberOfRooms, 0);

        if (reservedRooms + booking.numberOfRooms > room.totalRooms) {
            return res.status(400).json({ message: `Cannot approve. Only ${room.totalRooms - reservedRooms} rooms available.` });
        }

        booking.status = 'Confirmed';
        await booking.save();
        res.json({ message: 'Booking Approved & Confirmed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = 'Cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
