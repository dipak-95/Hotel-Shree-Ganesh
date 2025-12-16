import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/rooms`)
            .then(res => {
                console.log("Rooms fetched:", res.data);
                setRooms(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching rooms:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-24 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-pulse">
                        <div className="h-10 bg-slate-200 w-3/4 md:w-1/2 mx-auto rounded-lg mb-4"></div>
                        <div className="h-4 bg-slate-200 w-1/2 mx-auto rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col animate-pulse">
                                <div className="h-64 bg-slate-200"></div>
                                <div className="p-8 flex-1">
                                    <div className="h-8 bg-slate-200 w-3/4 mb-4 rounded"></div>
                                    <div className="h-4 bg-slate-200 w-full mb-2 rounded"></div>
                                    <div className="h-4 bg-slate-200 w-2/3 mb-6 rounded"></div>
                                    <div className="flex justify-between mt-4">
                                        <div className="h-10 bg-slate-200 w-20 rounded"></div>
                                        <div className="h-10 bg-slate-200 w-32 rounded-xl"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-24 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">Luxurious Accommodations</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">Choose from our range of meticulously designed rooms, perfect for families and groups.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {rooms.map((room, index) => (
                        <div key={room._id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col">
                            <div className="h-64 bg-slate-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                                {/* Placeholder Gradient for Image - Varied slightly for effect */}
                                <div className={`w-full h-full bg-gradient-to-br ${index === 0 ? 'from-blue-200 to-indigo-100' : index === 1 ? 'from-cyan-100 to-blue-200' : 'from-indigo-100 to-purple-100'} group-hover:scale-110 transition-transform duration-700`}></div>
                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 tracking-wide uppercase">
                                        Best Seller
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-slate-800 mb-3 font-serif">{room.type}</h3>
                                <p className="text-slate-500 mb-6 flex-1 text-sm leading-relaxed">{room.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-bold text-blue-600">₹{room.price}</span>
                                        <span className="text-sm text-slate-400 font-medium block">/ night</span>
                                    </div>
                                    <Link to={`/book/${room._id}`} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20 w-full md:w-auto text-center block md:inline-block mt-4 md:mt-0">
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
