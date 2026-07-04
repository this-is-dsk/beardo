import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#111111] pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand & Newsletter */}
          <div>
            <Link to="/" className="inline-block mb-6">
  <img
    src="/images/footer-logo.avif"
    alt="Beardo"
    className="h-12 md:h-14 w-auto"
  />
</Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Join the Beardo club for exclusive offers, grooming tips, and early access to new product launches.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-[#1a1a1a] text-white px-5 py-4 text-sm border border-[#333] w-full"
              />
              <button className="bg-[#cc0000] text-white px-8 py-4 font-bold uppercase hover:bg-[#aa0000]">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/category/beard" className="text-gray-400 hover:text-[#cc0000] text-sm">Beard Care</Link></li>
              <li><Link to="/category/hair" className="text-gray-400 hover:text-[#cc0000] text-sm">Hair Care</Link></li>
              <li><Link to="/category/face" className="text-gray-400 hover:text-[#cc0000] text-sm">Skin Care</Link></li>
              <li><Link to="/category/fragrance" className="text-gray-400 hover:text-[#cc0000] text-sm">Fragrances</Link></li>
              <li><Link to="/category/electronics" className="text-gray-400 hover:text-[#cc0000] text-sm">Trimmers</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-[#cc0000] text-sm">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#cc0000] text-sm">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#cc0000] text-sm">Track Order</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#cc0000] text-sm">FAQs</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#cc0000] text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li className="text-gray-400 text-sm">Email: beardo@gmail.com</li>
              <li className="text-gray-400 text-sm">Working Hours: 10AM to 7PM</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#cc0000] hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#cc0000] hover:text-white transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#cc0000] hover:text-white transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#cc0000] hover:text-white transition-all">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Beardo. All Rights Reserved.
          </p>
          <div className="flex gap-3 mt-4">
            <Link to="#" className="text-gray-500 hover:text-white text-xs">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 hover:text-white text-xs">Terms of Service</Link>
            <Link to="#" className="text-gray-500 hover:text-white text-xs">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
