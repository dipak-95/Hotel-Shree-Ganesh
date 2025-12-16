const About = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Header */}
            <div className="bg-slate-900 py-32 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">About Us</h1>
                    <p className="text-blue-200 text-xl max-w-2xl mx-auto px-4">Discover the story behind Hotel Shree Ganesh and our commitment to your comfort.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Story & Timeline */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Our Legacy</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Growing with Your Blessings</h2>
                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                            From a humble beginning to a premier stay in Somnath, our journey has been fueled by the faith of our guests.
                        </p>
                    </div>

                    <div className="relative border-l-4 border-blue-100 ml-4 md:ml-auto md:max-w-4xl md:mx-auto space-y-12 pl-8">
                        {/* Timeline Item 2014 */}
                        <div className="relative">
                            <span className="absolute -left-[42px] bg-blue-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">14</span>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                                <span className="text-blue-600 font-bold text-sm">2014</span>
                                <h3 className="text-xl font-bold text-slate-900">The Beginning</h3>
                                <p className="text-slate-600 mt-2">Established Hotel Shree Ganesh with our first <span className="font-bold text-slate-800">7 Rooms</span>, pledging to serve pilgrims with purity and comfort.</p>
                            </div>
                        </div>

                        {/* Timeline Item 2018 */}
                        <div className="relative">
                            <span className="absolute -left-[42px] bg-white border-4 border-blue-400 text-blue-900 font-bold rounded-full w-10 h-10 flex items-center justify-center">18</span>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                                <span className="text-blue-600 font-bold text-sm">2018</span>
                                <h3 className="text-xl font-bold text-slate-900">First Expansion</h3>
                                <p className="text-slate-600 mt-2">Added <span className="font-bold text-slate-800">4 New Rooms</span> (Total 11), upgrading our amenities to meet rising demand.</p>
                            </div>
                        </div>

                        {/* Timeline Item 2023 */}
                        <div className="relative">
                            <span className="absolute -left-[42px] bg-white border-4 border-indigo-400 text-indigo-900 font-bold rounded-full w-10 h-10 flex items-center justify-center">23</span>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                                <span className="text-blue-600 font-bold text-sm">2023</span>
                                <h3 className="text-xl font-bold text-slate-900">Major Growth</h3>
                                <p className="text-slate-600 mt-2">A significant milestone adding <span className="font-bold text-slate-800">11 Rooms</span> (Total 22) with modern interiors and AC facilities.</p>
                            </div>
                        </div>

                        {/* Timeline Item 2025 */}
                        <div className="relative">
                            <span className="absolute -left-[42px] bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-xl">25</span>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-blue-100 transform hover:scale-[1.02] transition duration-300">
                                <span className="text-blue-800 font-bold text-sm">2025 - Present</span>
                                <h3 className="text-2xl font-bold text-slate-900">The New Era</h3>
                                <p className="text-slate-700 mt-2">Expanded with <span className="font-bold text-slate-900">10 Luxury Rooms</span>, bringing our capacity to <span className="font-black text-blue-700 bg-white px-2 py-0.5 rounded shadow-sm">32 Rooms</span>. We are now one of the largest family hotels in the area.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Photo Gallery */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">A Glimpse of Serenity</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['room-1.jpg', 'room-2.jpg', 'room-3.jpg', 'room-4.jpg', 'room-5.jpg'].map((img, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg cursor-pointer">
                            <img
                                src={`/images/${img}`}
                                alt={`Hotel Room ${index + 1}`}
                                loading="lazy"
                                className="object-cover w-full h-full transform group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
