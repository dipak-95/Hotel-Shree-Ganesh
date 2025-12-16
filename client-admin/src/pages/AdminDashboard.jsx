import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');
    const navigate = useNavigate();

    // Offline Booking Form State
    const [offlineForm, setOfflineForm] = useState({
        guestName: '', phone: '', email: '',
        roomType: '2-Bed Room', checkInDate: '', checkOutDate: '', numberOfRooms: 1
    });

    // Room Editing State
    const [editingRoom, setEditingRoom] = useState(null);
    const [editForm, setEditForm] = useState({ totalRooms: 0, price: 0 });

    const startEdit = (room) => {
        setEditingRoom(room._id);
        setEditForm({ totalRooms: room.totalRooms, price: room.price });
    };

    const cancelEdit = () => {
        setEditingRoom(null);
        setEditForm({ totalRooms: 0, price: 0 });
    };

    const saveEdit = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:5000/api/rooms/${editingRoom}`, editForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Room Updated Successfully!");
            setEditingRoom(null);
            fetchData();
        } catch (error) {
            alert("Failed to update room.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const bookingRes = await axios.get('http://localhost:5000/api/bookings', config);
            const roomRes = await axios.get('http://localhost:5000/api/rooms');

            setBookings(bookingRes.data);
            setRooms(roomRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
            if (error.response && error.response.status === 401) {
                navigate('/admin');
            }
        }
    };

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:5000/api/bookings/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Booking Approved!");
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to approve. Room might be full.");
        }
    };

    const cancelBooking = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to cancel");
        }
    };

    const handleOfflineSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post('http://localhost:5000/api/bookings', {
                ...offlineForm,
                source: 'Offline'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Offline Booking Added!');
            fetchData();
            setActiveTab('bookings');
        } catch (error) {
            alert(error.response?.data?.message || "Booking Failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <nav className="bg-slate-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                        <button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg text-sm font-medium transition border border-slate-700">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-slate-200 pb-1 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-3 font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'bookings' ? 'bg-white text-blue-600 border-t border-x border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('chart')}
                        className={`px-6 py-3 font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'chart' ? 'bg-white text-blue-600 border-t border-x border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Occupancy Chart
                    </button>
                    <button
                        onClick={() => setActiveTab('rooms')}
                        className={`px-6 py-3 font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'rooms' ? 'bg-white text-blue-600 border-t border-x border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Room Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('offline')}
                        className={`px-6 py-3 font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === 'offline' ? 'bg-white text-blue-600 border-t border-x border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        + Offline Booking
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[600px]">
                    {activeTab === 'bookings' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">All Bookings</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Room</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200 text-sm">
                                        {bookings.map(booking => (
                                            <tr key={booking._id} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-medium text-slate-900">{booking.guestName}<div className="text-xs text-slate-400 font-normal">{booking.phone}</div></td>
                                                <td className="px-6 py-4 text-slate-600">{booking.roomType} <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">x{booking.numberOfRooms}</span></td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.source === 'Online' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {booking.source}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 flex space-x-2">
                                                    {booking.status === 'Pending' && (
                                                        <button
                                                            onClick={() => handleApprove(booking._id)}
                                                            className="text-green-600 hover:text-green-900 font-bold hover:underline"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                                                        <button
                                                            onClick={() => cancelBooking(booking._id)}
                                                            className="text-red-600 hover:text-red-900 font-medium hover:underline"
                                                        >
                                                            {booking.status === 'Pending' ? 'Reject' : 'Cancel'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'chart' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">Daily Occupancy (Next 30 Days)</h2>
                            <div className="h-[500px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={(() => {
                                            const data = [];
                                            const today = new Date();
                                            // Ensure we cover all room types
                                            const roomTypes = rooms.map(r => r.type);

                                            for (let i = 0; i < 30; i++) {
                                                const date = new Date(today);
                                                date.setDate(today.getDate() + i);
                                                date.setHours(0, 0, 0, 0);

                                                const dayData = {
                                                    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                                    Total: 0
                                                };
                                                // Initialize counts for each room type to 0
                                                roomTypes.forEach(type => dayData[type] = 0);

                                                bookings.forEach(b => {
                                                    if (b.status === 'Confirmed') {
                                                        const start = new Date(b.checkInDate);
                                                        const end = new Date(b.checkOutDate);
                                                        start.setHours(0, 0, 0, 0);
                                                        end.setHours(0, 0, 0, 0);

                                                        if (date >= start && date < end) {
                                                            dayData[b.roomType] = (dayData[b.roomType] || 0) + b.numberOfRooms;
                                                            dayData.Total += b.numberOfRooms;
                                                        }
                                                    }
                                                });
                                                data.push(dayData);
                                            }
                                            return data;
                                        })()}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {rooms.map((room, index) => {
                                            const colors = ['#2563eb', '#16a34a', '#9333ea', '#ea580c', '#db2777'];
                                            return (
                                                <Bar
                                                    key={room._id}
                                                    dataKey={room.type}
                                                    fill={colors[index % colors.length]}
                                                />
                                            );
                                        })}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {activeTab === 'rooms' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">Room Inventory</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rooms.map(room => (
                                    <div key={room._id} className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">{room.type}</h3>
                                        <p className="text-slate-500 mb-4 text-sm">{room.description}</p>

                                        {/* Edit Mode Logic */}
                                        {editingRoom === room._id ? (
                                            <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Total Rooms</label>
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                                        value={editForm.totalRooms}
                                                        onChange={e => setEditForm({ ...editForm, totalRooms: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Price (₹)</label>
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                                        value={editForm.price}
                                                        onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex space-x-2 pt-2">
                                                    <button onClick={saveEdit} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-bold">Save</button>
                                                    <button onClick={cancelEdit} className="flex-1 bg-slate-300 text-slate-700 py-2 rounded hover:bg-slate-400 text-sm font-bold">Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                                                    <span className="font-mono text-slate-600">Total: {room.totalRooms}</span>
                                                    <span className="font-bold text-blue-600">₹{room.price}</span>
                                                </div>
                                                <button
                                                    onClick={() => startEdit(room)}
                                                    className="w-full mt-4 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition text-sm font-medium"
                                                >
                                                    Edit Inventory
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'offline' && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Add Offline Booking</h2>
                            <form onSubmit={handleOfflineSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Guest Name</label>
                                    <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                                        onChange={e => setOfflineForm({ ...offlineForm, guestName: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                                        <input type="tel" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                                            onChange={e => setOfflineForm({ ...offlineForm, phone: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                        <input type="email" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            onChange={e => setOfflineForm({ ...offlineForm, email: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Room Type</label>
                                    <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        onChange={e => setOfflineForm({ ...offlineForm, roomType: e.target.value })}>
                                        {rooms.map(r => <option key={r._id} value={r.type}>{r.type}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Check In</label>
                                        <input type="date" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                                            onChange={e => setOfflineForm({ ...offlineForm, checkInDate: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Check Out</label>
                                        <input type="date" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                                            onChange={e => setOfflineForm({ ...offlineForm, checkOutDate: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Number of Rooms</label>
                                    <input type="number" min="1" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                                        onChange={e => setOfflineForm({ ...offlineForm, numberOfRooms: e.target.value })} />
                                </div>
                                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition shadow-lg">
                                    Create Booking
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
