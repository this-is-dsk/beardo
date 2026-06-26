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
tracking-[0.15em]
uppercase
py-2
text-center
">
  <span>☀️ Summer's Ending, Savings Aren't! B2G2 FREE</span>
</div>
      <header 
        className={`sticky top-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
? 'bg-black/90 backdrop-blur-xl border-b border-[#222] shadow-2xl'
: 'bg-black/20 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Mobile Menu (Mobile) / Nav Links (Desktop) */}
          <div className="flex items-center lg:w-1/3">
            <button 
              className="lg:hidden text-white hover:text-[#cc0000] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu size={26} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="group relative text-white font-semibold text-[13px] tracking-[0.18em] uppercase transition-colors"
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
  className="h-10 md:h-12 object-contain"
/>
              
            </Link>
          </div>

          {/* Right: Search, Account & Cart */}
          <div className="flex items-center justify-end gap-3 lg:gap-5 lg:w-1/3">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
onKeyDown={handleSearch}
                className="
bg-[#181818]
border border-[#2a2a2a]
rounded-full
py-3
px-4
pl-12
text-sm
text-white
focus:border-[#cc0000]
focus:shadow-[0_0_20px_rgba(204,0,0,0.25)]
transition-all
"
              />
              <FiSearch className="absolute left-4 text-gray-400 group-focus-within:text-[#cc0000] transition-colors" size={18} />
            </div>

            {/* Mobile Search Icon */}
            <button 
              className="lg:hidden w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-white hover:text-[#cc0000] hover:bg-[#1a1a1a] transition-all duration-300"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FiSearch size={22} />
            </button>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <button 
                className="w-10 h-10 rounded-full bg-[#1a1a1a]/50 hover:bg-[#cc0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all duration-300 hidden sm:flex"
                onClick={() => setIsAccountPanelOpen(true)}
              >
                <FiUser size={18} />
              </button>
              
              <button className="w-10 h-10 rounded-full bg-[#1a1a1a]/50 hover:bg-[#cc0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all duration-300 hidden md:flex">
                <FiHeart size={18} />
              </button>

              <button 
                className="w-10 h-10 rounded-full bg-[#1a1a1a]/50 hover:bg-[#cc0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all duration-300 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <FiShoppingCart size={18} />
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
                className="w-10 h-10 rounded-full bg-transparent text-white flex items-center justify-center hover:text-[#cc0000] transition-colors sm:hidden"
                onClick={() => setIsAccountPanelOpen(true)}
              >
                <FiUser size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Row Expandable */}
        <AnimatePresence>
          {showSearch && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 flex items-center relative">
                <FiSearch className="absolute left-8 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search for premium grooming..." 
                  value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
onKeyDown={handleSearch}
                  className="w-full bg-[#1a1a1a] rounded-full py-3 px-4 pl-12 text-sm text-white focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] border border-gray-800 transition-all placeholder-gray-500"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Side Menus */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <AccountPanel isOpen={isAccountPanelOpen} onClose={() => setIsAccountPanelOpen(false)} />
    </>
  );
};
