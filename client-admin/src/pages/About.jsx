const About = () => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">About Hotel Shree Ganesh</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="bg-orange-100 rounded-3xl h-96 flex items-center justify-center text-orange-900 font-bold text-xl">
                        Hotel Interior Image
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Spiritual Home in Somnath</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Welcome to Hotel Shree Ganesh, located in the divine city of Somnath.
                            We pride ourselves on offering a blend of traditional hospitality and modern comfort.
                            Our mission is to provide a peaceful sanctuary for pilgrims and tourists alike.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Whether you are visiting for a spiritual journey or a family vacation,
                            our 32 fully air-conditioned rooms ensure a relaxing stay.
                            We specialize in hosting group tours, offering special kitchen facilities and support for large groups.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-l-4 border-orange-500 pl-4">
                                <h3 className="font-bold text-gray-800">Prime Location</h3>
                                <p className="text-sm text-gray-500">Close to Somnath Temple</p>
                            </div>
                            <div className="border-l-4 border-orange-500 pl-4">
                                <h3 className="font-bold text-gray-800">Group Friendly</h3>
                                <p className="text-sm text-gray-500">Kitchen space available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
