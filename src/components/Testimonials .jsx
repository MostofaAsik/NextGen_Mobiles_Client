import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            role: 'CEO, Example Inc.',
            image: '/Testmonials/p1.jpeg',
            quote: "This product has changed the way we do business. It's amazing and easy to use!",
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'Marketing Manager, Another Corp.',
            image: '/Testmonials/p2.jpg',
            quote: "A fantastic experience! The customer service was top-notch and the product exceeded expectations.",
        },
        {
            id: 3,
            name: 'Mark Wilson',
            role: 'Developer, Tech Solutions',
            image: '/Testmonials/p3.jpg',
            quote: "This product has improved our workflow and productivity. Highly recommend it!",
        },
    ];

    return (
        <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">What Our Customers Are Saying</h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                <p className="text-gray-400 mb-4">{testimonial.role}</p>
                                <p className="text-lg text-gray-300 italic">"{testimonial.quote}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
