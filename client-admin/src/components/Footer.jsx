const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-orange-500">Hotel Shree Ganesh</h3>
                    <p className="text-gray-400">
                        Experience comfort and spirituality at Somnath's finest stay.
                        Close to the temple, offering best-in-class hospitality.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                        <li><a href="/rooms" className="hover:text-white transition">Rooms & Booking</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <p className="text-gray-400">Somnath, Gujarat</p>
                    <p className="text-gray-400">Phone: +91 1234567890</p>
                    <p className="text-gray-400">Email: stay@shreeganesh.com</p>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Hotel Shree Ganesh. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
