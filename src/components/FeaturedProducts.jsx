import React from 'react';
import Marquee from 'react-fast-marquee';

const FeaturedProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Smartphone X Pro',
            image: '/FeatureProduct/sp1.png',
            price: '$999',
        },
        {
            id: 2,
            name: 'Smartphone Y Ultra',
            image: '/FeatureProduct/sp2.png',
            price: '$899',
        },
        {
            id: 3,
            name: 'Smartphone Z Max',
            image: '/FeatureProduct/sp3.png',
            price: '$799',
        },
        {
            id: 4,
            name: 'Smartphone Alpha',
            image: '/FeatureProduct/sp44.png',
            price: '$699',
        },
        {
            id: 5,
            name: 'Smartphone Beta',
            image: '/FeatureProduct/sp5.png',
            price: '$599',
        },
    ];

    return (
        <section className="bg-gray-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>

                <div className="overflow-hidden relative">
                    <Marquee speed={40} gradient={false} pauseOnHover={true}>
                        {/* Map over the products */}
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-gray-800 rounded-lg shadow-lg p-4 min-w-[200px] md:min-w-[250px] flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-yellow-500 text-lg font-bold">{product.price}</p>
                            </div>
                        ))}
                        {/* Duplicate the products for continuous scroll */}
                        {products.map((product) => (
                            <div
                                key={`duplicate-${product.id}`}
                                className="bg-gray-800 rounded-lg shadow-lg p-4 min-w-[200px] md:min-w-[250px] flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-yellow-500 text-lg font-bold">{product.price}</p>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
