import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import useUserData from '../../../hooks/useUserData';

const MyWishList = () => {
    const [wishlist, setWishlist] = useState([]); // State to store wishlist products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const { userData } = useUserData();
    const userId = userData?._id;

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('access-token');

                const response = await axios.get(`http://localhost:5000/wishlist/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setWishlist(response.data); // Update the wishlist data
            } catch (error) {
                if (error.response) {
                    setError(`Error: ${error.response.data.message || 'Failed to fetch wishlist'}`);
                } else if (error.request) {
                    setError('No response from server. Please try again later.');
                } else {
                    setError('An error occurred. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchWishlist();
        }
    }, [userId]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.delete(`http://localhost:5000/wishlist/${userId}/${productId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                setWishlist(wishlist.filter(product => product._id !== productId));
                toast.success('product remove from wishlist')
            }
        } catch (error) {
            console.error('Failed to remove product from wishlist', error);
        }
    };

    if (loading) {
        return <p className="text-center text-lg font-semibold">Loading wishlist...</p>;
    }

    if (error) {
        return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">My WishList</h2>

            {wishlist.length === 0 ? (
                <p className="text-center text-gray-500">No items in your wishlist</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col"
                        >
                            {/* Product Image */}
                            <img
                                src={product.imageURL}
                                alt={product.title}
                                className="h-48 w-full object-cover"
                            />

                            {/* Product Details */}
                            <div className="p-4 flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {product.title}
                                </h3>
                                <p className="mt-2 text-gray-600 text-sm">
                                    {product.description?.slice(0, 100)}...
                                </p>
                                <p className="mt-2 text-blue-600 font-bold">
                                    ${product.price}
                                </p>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => handleRemoveFromWishlist(product._id)}
                                className="bg-red-500 text-white text-center font-semibold py-2 w-full mt-auto hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>

                    ))}
                    <ToastContainer />
                </div>
            )}
        </div>
    );
};

export default MyWishList;
