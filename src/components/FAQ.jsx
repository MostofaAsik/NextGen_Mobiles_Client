import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: 'What is the return policy?',
            answer: 'Our return policy allows you to return products within 30 days of purchase. Please make sure the item is in original condition.',
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship internationally. International shipping rates may vary depending on the destination.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email to track your package.',
        },
        {
            question: 'Can I change my order after placing it?',
            answer: 'Unfortunately, once an order is placed, we cannot make changes. However, you can cancel the order within 1 hour of placing it.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept credit cards, debit cards, PayPal, and other secure payment methods.',
        },
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12 text-yellow-500">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 rounded-lg shadow-lg p-4 transition-all duration-300 hover:bg-gray-700"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleAnswer(index)}
                            >
                                <h3 className="text-xl font-semibold text-left">{faq.question}</h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-6 h-6 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            {activeIndex === index && (
                                <p className="text-gray-400 mt-4 text-left">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
