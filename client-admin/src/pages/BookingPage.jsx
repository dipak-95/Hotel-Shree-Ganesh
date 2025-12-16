import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        guestName: '',
        phone: '',
        email: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfRooms: 1,
        // roomType will be fetched or mapped from ID
        roomType: '2-Bed Room' // Default or fetch based on ID
    });
    const [loading, setLoading] = useState(false);

    // Mock mapping for ID to Room Type (Real app would fetch room details)
    useEffect(() => {
        if (id === '1') setFormData(prev => ({ ...prev, roomType: '2-Bed Room' }));
        if (id === '2') setFormData(prev => ({ ...prev, roomType: '3-Bed Room' }));
        if (id === '3') setFormData(prev => ({ ...prev, roomType: '4-Bed Room' }));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/bookings', {
                ...formData,
                source: 'Online'
            });
            alert('Booking Requested Successfully!');
            navigate('/rooms');
        } catch (error) {
            console.error(error);
            alert('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Book {formData.roomType}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" required className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            onChange={e => setFormData({ ...formData, guestName: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" required className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                            <input type="email" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-In</label>
                            <input type="date" required className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                onChange={e => setFormData({ ...formData, checkInDate: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-Out</label>
                            <input type="date" required className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                onChange={e => setFormData({ ...formData, checkOutDate: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                        <input type="number" min="1" max="5" value={formData.numberOfRooms} className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            onChange={e => setFormData({ ...formData, numberOfRooms: e.target.value })} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition disabled:opacity-50">
                        {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
