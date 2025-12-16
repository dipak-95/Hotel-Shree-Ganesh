import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [formData, setFormData] = useState({
        guestName: '',
        phone: '',
        email: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfRooms: 1,
        roomType: ''
    });
    const [loading, setLoading] = useState(false);
    const [roomLoading, setRoomLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/rooms/${id}`);
                setRoom(res.data);
                setFormData(prev => ({ ...prev, roomType: res.data.type }));
                setRoomLoading(false);
            } catch (err) {
                console.error("Error fetching room:", err);
                alert("Room not found");
                navigate('/rooms');
            }
        };
        fetchRoom();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/bookings`, {
                ...formData,
                source: 'Online'
            });
            alert('Inquiry Sent Successfully! Waiting for Admin Approval.');
            navigate('/rooms');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (roomLoading) return <div className="text-center py-20 text-slate-500">Loading details...</div>;

    const maxRooms = room ? room.totalRooms : 5;

    return (
        <div className="py-24 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Room Details & Visuals */}
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                            <img
                                src="/images/room-1.jpg"
                                alt={room.type}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h1 className="text-4xl font-serif font-bold mb-2">{room.type}</h1>
                                <p className="text-blue-200 text-lg flex items-center gap-2">
                                    <span className="font-bold text-3xl">₹{room.price}</span> / night
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {['room-2.jpg', 'room-3.jpg', 'room-4.jpg'].map((img, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden aspect-square border border-slate-200 shadow-sm">
                                    <img src={`/images/${img}`} className="w-full h-full object-cover hover:scale-110 transition duration-500" alt="Room View" />
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Room Description</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {room.description}. Designed for comfort and peace, featuring premium bedding, climate control, and modern attached bathrooms. Ideal for pilgrims seeking rest after a divine darshan.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800 font-serif">Complete Your Reservation</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input type="text" required className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                                    value={formData.guestName}
                                    onChange={e => setFormData({ ...formData, guestName: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                                    <input type="tel" required className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email (Optional)</label>
                                    <input type="email" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Check-In</label>
                                    <input type="date" required min={new Date().toISOString().split('T')[0]} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                                        value={formData.checkInDate}
                                        onChange={e => setFormData({ ...formData, checkInDate: e.target.value, checkOutDate: '' })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Check-Out</label>
                                    <input type="date" required
                                        min={formData.checkInDate ? new Date(new Date(formData.checkInDate).getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                                        value={formData.checkOutDate}
                                        onChange={e => setFormData({ ...formData, checkOutDate: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Number of Rooms</label>
                                <input type="number" min="1" max={maxRooms} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                                    value={formData.numberOfRooms}
                                    onChange={e => setFormData({ ...formData, numberOfRooms: e.target.value })} />
                                <p className="text-xs text-slate-400 mt-2 text-right">Max available: {maxRooms}</p>
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-blue-900/30 disabled:opacity-70 mt-4">
                                {loading ? 'Sending Inquiry...' : 'Confirm Inquiry'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
