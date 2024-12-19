import React from 'react';

const ContactInfo = () => {
    return (
        <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12 text-white">Contact Us</h2>
                <p className="text-lg text-gray-400 mb-8">We’d love to hear from you! Get in touch with us through any of the channels below:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Address */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition-all">
                        <div className="flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v10m-7 1l7 7 7-7-7-7M4 12h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                        <p className="text-gray-400">1234 Main Street, Suite 100, City, Country</p>
                    </div>

                    {/* Email */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition-all">
                        <div className="flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7 7 7-7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                        <p className="text-gray-400">contact@yourwebsite.com</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition-all">
                        <div className="flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.032 4.032a5.019 5.019 0 00-.594 6.963L6 14a5.022 5.022 0 006.56 1.225l2.271 2.27a3 3 0 004.235-4.234l-5.659-5.66a3 3 0 00-4.234 4.234L9.674 7.17a2.99 2.99 0 00-3.5-.73l-1.12 1.12a5.002 5.002 0 000 6.96L5 20.318a5.022 5.022 0 001.228-.156l.29-.281c2.5-2.5 5.014-3.533 7.276-4.58A5.019 5.019 0 0018 8.036z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6 text-white">Follow Us</h3>
                    <div className="flex justify-center space-x-6">
                        {/* Social Media Icons */}
                        <a href="https://www.facebook.com" className="text-yellow-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M9 8H7v4h2V8zm0 10H7v-6h2v6zm11-9V5h-6v4h4v4h2V9h-2z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com" className="text-yellow-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 2.2c2.4 0 2.7.01 3.6.05 1.6.06 2.8.3 3.6 1.1s1.1 2.1 1.1 3.6c.04.9.04 1.2.04 3.6s0 2.7-.04 3.6c-.06 1.6-.3 2.8-1.1 3.6s-2 1.1-3.6 1.1c-.9.04-1.2.04-3.6.04s-2.7 0-3.6-.04c-1.6-.06-2.8-.3-3.6-1.1s-1.1-2-1.1-3.6c-.04-.9-.04-1.2-.04-3.6s0-2.7.04-3.6c.06-1.6.3-2.8 1.1-3.6s2-1.1 3.6-1.1c.9-.04 1.2-.04 3.6-.05z" />
                            </svg>
                        </a>
                        <a href="https://www.twitter.com" className="text-yellow-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M22.46 6.003c-.8.355-1.66.592-2.53.693a4.418 4.418 0 001.94-2.453 8.895 8.895 0 01-2.815 1.072 4.386 4.386 0 00-7.58 3.986c-3.643-.18-6.869-1.876-9.039-4.465a4.387 4.387 0 001.36 5.858c-.755-.024-1.47-.23-2.1-.575v.057a4.389 4.389 0 003.52 4.35 4.414 4.414 0 01-1.89.07 4.389 4.389 0 004.098 3.035 8.774 8.774 0 01-5.436 1.873c-.35 0-.698-.022-1.04-.062a12.41 12.41 0 007.78 2.276c9.29 0 14.398-7.692 14.398-14.37 0-.218-.005-.436-.014-.653a10.09 10.09 0 002.466-2.577z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;
