import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-50/90 border-t border-green-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between gap-10 text-gray-700">
        
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-green-700">DirtTrails Safaris</h3>
          <p className="max-w-sm text-sm">
            Sustainable eco-tourism experiences across East Africa. Explore, connect, and sustain with us.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} />
            <span>Uganda, East Africa</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} />
            <span>+256 759918649</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} />
            <span>safaris.dirttrails@gmail.com</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-green-700">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <Link to="/tours" className="hover:text-green-600">Tours</Link>
            <Link to="/bookings" className="hover:text-green-600">Bookings</Link>
            <Link to="/conservation" className="hover:text-green-600">Conservation</Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h4 className="font-semibold text-green-700">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-green-600">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-green-600">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-green-600">
              <Instagram size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-green-200 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} DirtTrails Safaris. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
