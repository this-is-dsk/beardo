import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu } from 'react-icons/fi';
import { MobileMenu } from './MobileMenu';
import { AccountPanel } from './AccountPanel';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountPanelOpen, setIsAccountPanelOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {

  if (e.key === "Enter" && searchTerm.trim()) {

    navigate(`/shop-all?search=${encodeURIComponent(searchTerm)}`);

    setShowSearch(false);

  }

};
  const { getCartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'New Launch', path: '/new' },
    { name: 'Alpha', path: '/alpha' },
    { name: 'Look Book', path: '/look-book' },
    { name: 'Franchise', path: '/franchise' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="
bg-[#cc0000]
text-white
text-xs
font-semibold
tracking-wide
uppercase
py-1.5
text-center
">
  <span>☀️ Summer's Ending, Savings Aren't! B2G2 FREE</span>
</div>
      <header 
        className={`sticky top-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
? 'bg-white border-b border-gray-200 shadow-sm'
: 'bg-white border-b border-gray-200'
        }`}
      >
        <div className="max-w-[1400px] mx-auto
px-4 lg:px-8 h-[64px] flex items-center justify-between">
          
          {/* Left: Mobile Menu (Mobile) / Nav Links (Desktop) */}
          <div className="flex items-center lg:w-1/3">
            <button 
              className="lg:hidden text-black hover:text-[#cc0000] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
             <FiMenu size={30} strokeWidth={1.8} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="group relative text-black font-semibold text-[13px] tracking-[0.18em] uppercase transition-colors"
                >
                  <span className="group-hover:text-[#cc0000] transition-colors duration-300">
                    {link.name}
                  </span>
                  {/* Hover Underline Animation */}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#cc0000] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Premium Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:w-1/3 absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none">
            <Link to="/" className="flex items-center gap-2 group">
            <img
  src="/images/logo.webp"
  alt="BEARDO"
  className="h-12 md:h-14 object-contain"
/>
              
            </Link>
          </div>

          {/* Right: Search, Account & Cart */}
          <div className="flex items-center justify-end gap-3 lg:gap-5 lg:w-1/3">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center relative group">
              <input 
                type="text" 
                placeholder="Search for Beard Oil"
                value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
onKeyDown={handleSearch}
                className="
bg-white
border border-gray-300
rounded-md
h-12
w-[320px]
pl-11
pr-4
text-black
placeholder:text-gray-500
focus:border-black
outline-none
transition-all
"
              />
              <FiSearch className="absolute left-4 text-gray-500 group-focus-within:text-[#cc0000] transition-colors" size={18} />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <button 
                className="w-10 h-10 rounded-full bg-transparent  text-black flex items-center justify-center hover:text-black transition-all duration-300 hidden sm:flex"
                onClick={() => setIsAccountPanelOpen(true)}
              >
                <FiUser size={18} />
              </button>
              
              <button className="w-10 h-10 rounded-full bg-transparent  text-black flex items-center justify-center hover:text-black transition-all duration-300 hidden md:flex">
                <FiHeart size={18} />
              </button>

              <button 
                className="w-10 h-10 rounded-full bg-transparent text-black flex items-center justify-center hover:text-black transition-all duration-300 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <FiShoppingCart size={22} />
                <AnimatePresence>
                  {getCartCount() > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#cc0000] border-2 border-[#111] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg"
                    >
                      {getCartCount()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Account Icon (since sm is hidden) */}
              <button 
                className="w-10 h-10 rounded-full bg-transparent text-black flex items-center justify-center hover:text-[#cc0000] transition-colors sm:hidden"
                onClick={() => setIsAccountPanelOpen(true)}
              >
                <FiUser size={26} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Row Expandable */}
        <div className="lg:hidden bg-white px-3 pb-4">

<div className="relative">

<FiSearch
className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
size={22}
/>

<input
type="text"
placeholder="Search for Beard Oil"
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
onKeyDown={handleSearch}
className="w-full h-[52px] rounded-md border border-gray-300 bg-white pl-14 pr-4 text-black text-base outline-none"
/>

</div>

</div>
      </header>

      {/* Side Menus */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <AccountPanel isOpen={isAccountPanelOpen} onClose={() => setIsAccountPanelOpen(false)} />
    </>
  );
};
