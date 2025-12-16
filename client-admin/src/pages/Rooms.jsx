import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/rooms')
            .then(res => setRooms(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="py-24 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Rooms</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rooms.map(room => (
                        <div key={room._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                                Room Image Placeholder
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{room.type}</h3>
                                <p className="text-gray-600 mb-4 flex-1">{room.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-orange-600">₹{room.price}<span className="text-sm text-gray-500 font-normal">/night</span></span>
                                    <Link to={`/book/${room._id}`} className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rooms;
