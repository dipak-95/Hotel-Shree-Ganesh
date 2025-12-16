import { Link } from 'react-router-dom';
import { FaWifi, FaParking, FaConciergeBell, FaBolt, FaWater, FaHandsWash, FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative h-[800px] flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>

                <div className="relative z-10 text-white max-w-5xl animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 backdrop-blur-sm border border-blue-400/30 text-blue-200 text-sm font-bold mb-6 tracking-widest uppercase">
                        Welcome to Somnath
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tight drop-shadow-2xl leading-tight font-serif">
                        Hotel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Shree Ganesh</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 font-light text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        A sanctuary of luxury steps away from the divine. Experience world-class hospitality tailored for your spiritual journey.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/rooms" className="px-10 py-4 bg-white text-blue-900 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                            Book Your Stay <FaArrowRight />
                        </Link>
                        <Link to="/about" className="px-10 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white backdrop-blur-md transition-all duration-300">
                            Discover More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-20">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4 font-serif">Premium Amenities</h2>
                        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                        <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg">
                            We curate every detail of your stay to ensure maximum comfort and peace of mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard icon={<FaWifi />} title="High-Speed Wi-Fi" desc="Seamless connectivity for work or leisure." />
                        <FeatureCard icon={<FaParking />} title="Secure Parking" desc="Exclusive guarded parking for your peace of mind." />
                        <FeatureCard icon={<FaConciergeBell />} title="24/7 Concierge" desc="Dedicated staff available round the clock." />
                        <FeatureCard icon={<FaBolt />} title="Power Backup" desc="100% uptime with industrial-grade generators." />
                        <FeatureCard icon={<FaWater />} title="Purified Water" desc="Unlimited RO water access for safe hydration." />
                        <FeatureCard icon={<FaHandsWash />} title="Hygiene First" desc="Sanitized rooms & daily housekeeping protocols." />
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-slate-900 py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800 via-slate-900 to-black"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-16 font-serif">Stories of Delight</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TestimonialCard
                            name="Rahul Sharma"
                            location="Ahmedabad"
                            text="An absolute gem in Somnath. The rooms were spotless, and the staff went out of their way to help my elderly parents. Highly recommended!"
                        />
                        <TestimonialCard
                            name="Priya Patel"
                            location="Mumbai"
                            text="Perfect for our group tour. The kitchen facility was a lifesaver. Very close to the temple and extremely peaceful atmosphere."
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 text-center">
                <h2 className="text-4xl font-bold mb-6 font-serif">Begin Your Divine Journey</h2>
                <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg">Secure your sanctuary in Somnath today. Best rates guaranteed for direct bookings.</p>
                <Link to="/rooms" className="inline-block bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                    Check Availability
                </Link>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-700 transition-colors">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
);

const TestimonialCard = ({ name, location, text }) => (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl text-left relative hover:bg-white/10 transition-colors duration-300">
        <FaQuoteLeft className="text-5xl text-blue-500/20 absolute top-8 left-8" />
        <p className="text-slate-300 italic mb-8 relative z-10 pl-4 text-lg leading-relaxed">"{text}"</p>
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg">
                {name[0]}
            </div>
            <div className="ml-4">
                <h4 className="font-bold text-white text-lg">{name}</h4>
                <p className="text-sm text-blue-300">{location}</p>
            </div>
            <div className="ml-auto flex text-yellow-400 gap-1">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
        </div>
    </div>
);

export default Home;
