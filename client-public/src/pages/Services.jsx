import { FaWifi, FaParking, FaConciergeBell, FaBolt, FaWater, FaUtensils, FaDumbbell, FaTaxi, FaUmbrellaBeach, FaPray } from 'react-icons/fa';

const Services = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-32 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">Amenities & Services</h1>
                    <p className="text-blue-100 text-xl max-w-2xl mx-auto px-4">Everything you need for a comfortable and divine stay.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ServiceItem icon={<FaWifi />} title="High Speed Wi-Fi" desc="Stay connected with loved ones." />
                    <ServiceItem icon={<FaParking />} title="Private Parking" desc="Secure spot for your car or bus." />
                    <ServiceItem icon={<FaConciergeBell />} title="Room Service" desc="Tea, coffee, and snacks on call." />
                    <ServiceItem icon={<FaBolt />} title="24/7 Power" desc="Generator backup for uninterrupted stay." />
                    <ServiceItem icon={<FaWater />} title="RO Water" desc="Purified water for health safety." />
                    <ServiceItem icon={<FaUtensils />} title="Group Kitchen" desc="Cook your own meals (for groups)." />
                    <ServiceItem icon={<FaTaxi />} title="Travel Desk" desc="Assistance with local sightseeing." />
                    <ServiceItem icon={<FaPray />} title="Temple Guide" desc="Information on darshan timings." />
                </div>
            </div>
        </div>
    );
};

const ServiceItem = ({ icon, title, desc }) => (
    <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group border border-slate-100 hover:-translate-y-2">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-4xl text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Services;
