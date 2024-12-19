import React from 'react';

const Banner = () => {
    return (
        <section className="bg-gray-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">

                {/* Left Content */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                        Welcome to <span className="text-yellow-500">NextGen Mobiles</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-6">
                        Discover the future of mobile technology with our latest smartphones, gadgets, and accessories. Experience innovation like never before.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <button

                            className="px-6 py-3 bg-yellow-500 text-white rounded-md text-lg font-semibold hover:bg-yellow-600 transition-all">
                            Shop Now
                        </button>
                        <button

                            className="px-6 py-3 bg-gray-800 text-white rounded-md text-lg font-semibold hover:bg-gray-700 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
                    <img
                        src="https://i.ibb.co.com/NS7SQZ8/banner.webp"
                        alt="Latest Smartphone"
                        className="w-full max-w-md md:max-w-lg rounded-xl drop-shadow-2xl"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;

