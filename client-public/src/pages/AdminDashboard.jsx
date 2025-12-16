import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [refresh, setRefresh] = useState(false); // To trigger re-fetch

    // Add Offline Booking Form State
    const [offlineForm, setOfflineForm] = useState({
        guestName: '', phone: '', roomType: '2-Bed Room',
        checkInDate: '', checkOutDate: '', numberOfRooms: 1
    });

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const fetchData = async () => {
        try {
            const bookingsRes = await axios.get('http://localhost:5000/api/bookings');
            setBookings(bookingsRes.data);
            const roomsRes = await axios.get('http://localhost:5000/api/rooms');
            setRooms(roomsRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const handleCancelBooking = async (id) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`);
            setRefresh(!refresh);
        } catch (error) {
            alert('Error cancelling booking');
        }
    };

    const handleAddOfflineBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/bookings', { ...offlineForm, source: 'Offline' });
            alert('Offline booking added!');
            setOfflineForm({ guestName: '', phone: '', roomType: '2-Bed Room', checkInDate: '', checkOutDate: '', numberOfRooms: 1 }); // Reset
            setRefresh(!refresh);
            setActiveTab('bookings');
        } catch (error) {
            alert('Error adding booking');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-300 pb-2">
                    <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 font-medium ${activeTab === 'bookings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Bookings</button>
                    <button onClick={() => setActiveTab('rooms')} className={`px-4 py-2 font-medium ${activeTab === 'rooms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Rooms</button>
                    <button onClick={() => setActiveTab('addOffline')} className={`px-4 py-2 font-medium ${activeTab === 'addOffline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>+ Add Offline Booking</button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow p-6">
                    {activeTab === 'bookings' && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map(booking => (
                                        <tr key={booking._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                                                <div className="text-sm text-gray-500">{booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.roomType} (x{booking.numberOfRooms})</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.source}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {booking.status !== 'Cancelled' && (
                                                    <button onClick={() => handleCancelBooking(booking._id)} className="text-red-600 hover:text-red-900">Cancel</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'rooms' && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {rooms.map(room => (
                                    <div key={room._id} className="border rounded p-4">
                                        <h3 className="font-bold text-lg">{room.type}</h3>
                                        <p className="text-gray-600">Price: ₹{room.price}</p>
                                        <p className="text-gray-600">Total Rooms: {room.totalRooms}</p>
                                        {/* Edit functionality could be added here */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'addOffline' && (
                        <form onSubmit={handleAddOfflineBooking} className="max-w-md mx-auto">
                            <h3 className="text-lg font-bold mb-4">New Offline Booking</h3>
                            <div className="space-y-4">
                                <input type="text" placeholder="Guest Name" required className="w-full p-2 border rounded"
                                    value={offlineForm.guestName} onChange={e => setOfflineForm({ ...offlineForm, guestName: e.target.value })} />
                                <input type="tel" placeholder="Phone" required className="w-full p-2 border rounded"
                                    value={offlineForm.phone} onChange={e => setOfflineForm({ ...offlineForm, phone: e.target.value })} />
                                <select className="w-full p-2 border rounded" value={offlineForm.roomType} onChange={e => setOfflineForm({ ...offlineForm, roomType: e.target.value })}>
                                    <option value="2-Bed Room">2-Bed Room</option>
                                    <option value="3-Bed Room">3-Bed Room</option>
                                    <option value="4-Bed Room">4-Bed Room</option>
                                </select>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="date" required className="w-full p-2 border rounded"
                                        value={offlineForm.checkInDate} onChange={e => setOfflineForm({ ...offlineForm, checkInDate: e.target.value })} />
                                    <input type="date" required className="w-full p-2 border rounded"
                                        value={offlineForm.checkOutDate} onChange={e => setOfflineForm({ ...offlineForm, checkOutDate: e.target.value })} />
                                </div>
                                <input type="number" min="1" placeholder="Number of Rooms" className="w-full p-2 border rounded"
                                    value={offlineForm.numberOfRooms} onChange={e => setOfflineForm({ ...offlineForm, numberOfRooms: e.target.value })} />
                                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Add Booking</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
