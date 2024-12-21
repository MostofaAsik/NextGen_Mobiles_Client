import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import Loader from '../components/Loader';

const ViewDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`);
                setProduct(response.data.product); // Ensure you're accessing the product object correctly
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to load product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center px-4 py-2 mb-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            >
                <FaArrowLeft className="mr-2" /> Back
            </button>

            {/* Product Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={product.imageURL}
                            alt={product.title}
                            className="w-full h-64 md:h-96 object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 w-full">
                        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Brand:</span> {product.brand}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Category:</span> {product.category}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-semibold">Description:</span> {product.description}
                        </p>
                        <p className="text-gray-800 font-bold text-lg mb-4">
                            <span className="font-semibold">Price:</span> ${product.price}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Stock:</span> {product.stock}
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ViewDetails;
