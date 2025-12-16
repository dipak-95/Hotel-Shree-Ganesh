import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300 border-b border-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-serif font-bold text-blue-900 tracking-tighter hover:scale-105 transition-transform flex items-center gap-2">
                            <span>Hotel Shree Ganesh</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-blue-700 transition-colors font-medium text-lg">Home</Link>
                        <Link to="/about" className="text-slate-600 hover:text-blue-700 transition-colors font-medium text-lg">About Us</Link>
                        <Link to="/rooms" className="text-slate-600 hover:text-blue-700 transition-colors font-medium text-lg">Rooms</Link>
                        <Link to="/services" className="text-slate-600 hover:text-blue-700 transition-colors font-medium text-lg">Services</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex item-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 focus:outline-none">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Premium Glassmorphism) */}
            <div className={`md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-2xl transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                <div className="px-6 py-8 space-y-4 flex flex-col items-center">
                    <Link to="/" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl text-lg font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all">Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl text-lg font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all">About Us</Link>
                    <Link to="/rooms" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl text-lg font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all">Rooms</Link>
                    <Link to="/services" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl text-lg font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all">Services</Link>
                    <Link to="/rooms" onClick={() => setIsOpen(false)} className="w-full text-center py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all mt-4">Book Now</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
