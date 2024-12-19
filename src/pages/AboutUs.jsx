import React from 'react';

const teamMembers = [
    {
        id: 1,
        image: '/public/Testmonials/p1.jpeg',
        name: 'John Doe',
        role: 'Founder & CEO',
    },
    {
        id: 2,
        image: '/public/Testmonials/p2.jpg',
        name: 'Jane Smith',
        role: 'Head of Marketing',
    },
    {
        id: 3,
        image: '/public/Testmonials/p3.jpg',
        name: 'Sam Johnson',
        role: 'Lead Developer',
    },
    {
        id: 4,
        image: '/public/Testmonials/p2.jpg',
        name: 'Emily Davis',
        role: 'Product Designer',
    },
];

const AboutUs = () => {
    return (
        <div className="bg-gray-100">

            {/* Hero Section */}
            <section className="bg-gray-900  text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About Our Company
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        We are committed to providing the best products and services for our customers.
                    </p>
                    <a
                        href="#about"
                        className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-bold transition-all hover:bg-blue-700 hover:text-white"
                    >
                        Learn More
                    </a>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-0 bg-gray-900 ">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2">
                        <img
                            src="/public/large.png"
                            alt="About Us"
                            className="rounded-lg shadow-md w-full"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Who We Are
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our company is built on trust, integrity, and a passion for excellence. We strive to create innovative solutions that meet the needs of our customers. From humble beginnings to a global brand, our journey has been fueled by a dedication to quality.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Our mission is to deliver products that make a difference in people's lives. We believe in continuous improvement and putting our customers first in everything we do.
                        </p>
                        <a
                            href="#team"
                            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold transition-all hover:bg-blue-700"
                        >
                            Meet Our Team
                        </a>
                    </div>

                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="bg-gray-900  py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Meet Our Team
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {teamMembers.map(member => (
                            <div key={member.id} className="bg-gray-900 rounded-lg shadow-md p-6 text-center border">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                <p className="text-white">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
