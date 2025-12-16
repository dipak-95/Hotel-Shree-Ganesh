import { Link } from 'react-router-dom';
import { FaWifi, FaParking, FaConciergeBell, FaBolt, FaWater, FaHandsWash } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-orange-600 h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-yellow-500 opacity-90"></div>
                <div className="relative z-10 text-white max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
                        Hotel Shree Ganesh
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 font-light text-orange-100">
                        Sanctity meets Comfort in Somnath. <br /> Your perfect stay for Group & Spiritual Tours.
                    </p>
                    <Link to="/rooms" className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Book Your Stay
                    </Link>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Stay With Us?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Enjoy a hassle-free stay with premium amenities designed for your comfort and spiritual peace.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <FeatureCard icon={<FaWifi />} title="Free Wi-Fi" desc="Stay connected with high-speed internet." />
                    <FeatureCard icon={<FaParking />} title="Private Parking" desc="Secure parking space for your personal vehicle." />
                    <FeatureCard icon={<FaConciergeBell />} title="24/7 Reception" desc="Always available to assist you." />
                    <FeatureCard icon={<FaBolt />} title="Power Backup" desc="Uninterrupted comfort with 24/7 generator." />
                    <FeatureCard icon={<FaWater />} title="RO Water" desc="Clean and safe drinking water availability." />
                    <FeatureCard icon={<FaHandsWash />} title="Clean Hygiene" desc="Sanitized rooms & accessories provided." />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
        <div className="text-4xl text-orange-500 mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-500">{desc}</p>
    </div>
);

export default Home;
