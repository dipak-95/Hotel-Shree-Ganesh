const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., '2-Bed', '3-Bed', '4-Bed'
    price: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
    description: { type: String },
    images: [String]
});

module.exports = mongoose.model('Room', RoomSchema);
```
