import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">


                    <div>
                        <h2 className="text-2xl font-bold mb-4">YourBrand</h2>
                        <p className="text-gray-400">We offer the best tech gadgets and mobile devices at unbeatable prices. Follow us to stay updated with our latest products.</p>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-xl font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Delivery</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Returns & Exchanges</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter to get updates on our latest offers.</p>
                        <form className="flex flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                                type="submit"
                                className="mt-2 sm:mt-0 sm:ml-2 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-gray-700 pt-6">
                    <p className="text-center text-gray-400">&copy; 2024 YourBrand. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;