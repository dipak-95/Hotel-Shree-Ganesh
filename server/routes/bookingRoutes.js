const express = require('express');
const router = express.Router();
// const Booking = require('../models/Booking'); // Will implement controller logic later

const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getBookings);
router.post('/', bookingController.createBooking);
router.put('/:id/approve', bookingController.approveBooking);
router.put('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
