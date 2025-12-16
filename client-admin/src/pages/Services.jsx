import { FaWifi, FaParking, FaConciergeBell, FaBolt, FaWater, FaUtensils, FaDumbbell, FaTaxi } from 'react-icons/fa';

const Services = () => {
    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-12 text-gray-800">Our Services & Amenities</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ServiceItem icon={<FaWifi />} title="High Speed Wi-Fi" />
                    <ServiceItem icon={<FaParking />} title="Car Parking" />
                    <ServiceItem icon={<FaConciergeBell />} title="Room Service" />
                    <ServiceItem icon={<FaBolt />} title="Power Backup" />
                    <ServiceItem icon={<FaWater />} title="Hot & Cold Water" />
                    <ServiceItem icon={<FaUtensils />} title="Group Kitchen" />
                    <ServiceItem icon={<FaDumbbell />} title="New Amenities" />
                    <ServiceItem icon={<FaTaxi />} title="Tours & Travel" />
                </div>
            </div>
        </div>
    );
};

const ServiceItem = ({ icon, title }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-md transition">
        <div className="text-3xl text-orange-500 mb-3">{icon}</div>
        <h3 className="font-semibold text-gray-700">{title}</h3>
    </div>
);

export default Services;
