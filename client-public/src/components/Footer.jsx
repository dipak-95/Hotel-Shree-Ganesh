const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-2xl font-serif font-bold mb-6 text-blue-400">Hotel Shree Ganesh</h3>
                    <p className="text-slate-400 leading-relaxed hover:text-slate-300 transition-colors">
                        Experience comfort and spirituality at Somnath's finest stay.
                        Close to the temple, offering best-in-class hospitality.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-6 text-slate-200">Quick Links</h3>
                    <ul className="space-y-4 text-slate-400">
                        <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                        <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        <li><a href="/rooms" className="hover:text-blue-400 transition-colors">Rooms & Booking</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-6 text-slate-200">Contact</h3>
                    <p className="text-slate-400 mb-2">Somnath, Gujarat</p>
                    <p className="text-slate-400 mb-2">Phone: +91 1234567890</p>
                    <p className="text-slate-400">Email: stay@shreeganesh.com</p>
                </div>
            </div>
            <div className="mt-16 border-t border-slate-900 pt-8 text-center text-slate-600 text-sm">
                &copy; {new Date().getFullYear()} Hotel Shree Ganesh. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
