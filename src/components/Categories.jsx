import React from 'react';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Smartphones',
            image: '/categories/smartphone (1).webp',
        },
        {
            id: 2,
            name: 'Laptops',
            image: '/categories/laptop.webp',
        },
        {
            id: 3,
            name: 'Headphones',
            image: '/categories/ear.jpg',
        },

        {
            id: 4,
            name: 'Smart Watches',
            image: '/categories/watch.jpg',
        },

    ];

    return (
        <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12 text-white">Browse Our Categories</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative rounded-lg overflow-hidden bg-gray-900 shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-64 object-cover transition-all duration-500 hover:opacity-75"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 transition-all duration-300 hover:opacity-75"></div>
                            <div className="absolute bottom-4 left-4 text-white font-semibold text-xl">{category.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
