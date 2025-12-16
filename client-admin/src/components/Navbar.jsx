import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full z-10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-orange-600 tracking-tighter hover:scale-105 transition-transform">
                            Hotel Shree Ganesh
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About Us</Link>
                        <Link to="/rooms" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Rooms</Link>
                        <Link to="/services" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Services</Link>
                        <Link to="/admin" className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-sm border px-3 py-1 rounded hover:bg-orange-50">Admin</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex item-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                    <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">About Us</Link>
                    <Link to="/rooms" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Rooms</Link>
                    <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Services</Link>
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">Admin</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
