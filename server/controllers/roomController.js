const Room = require('../models/Room');

// Get all rooms
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single room
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a room (Admin)
exports.createRoom = async (req, res) => {
    try {
        const { type, price, totalRooms, description } = req.body;
        const newRoom = new Room({ type, price, totalRooms, description });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update room details (Admin) - e.g., price or total inventory
exports.updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete room (Admin)
exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
