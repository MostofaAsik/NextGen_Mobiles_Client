import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import useUserData from '../../../hooks/useUserData';
import { FaTrash, FaCartPlus } from 'react-icons/fa';

const MyWishList = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { userData } = useUserData();
    const userId = userData?._id;
    console.log(wishlist);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('access-token'); // Get JWT token

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setWishlist(response.data); // Set the fetched wishlist
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
            const token = localStorage.getItem('access-token'); // Get JWT token

            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/wishlist/${userId}/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                // Update state after successful removal
                setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
                toast.success('Product removed from wishlist');
            }
        } catch (error) {
            toast.error('Failed to remove product from wishlist');
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            // Add product to cart logic (placeholder)
            toast.success('Product added to cart');
        } catch (error) {
            toast.error('Failed to add product to cart');
        }
    };

    if (loading) {
        return <p className="text-center text-lg font-semibold">Loading wishlist...</p>;
    }

    if (error) {
        return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
    }

    return (
        <div className="container mx-auto px-1 pt-4">
            <h2 className="text-3xl font-bold text-center mb-6">My WishList</h2>

            {wishlist.length === 0 ? (
                <p className="text-center text-gray-500">No items in your wishlist</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map((product) => (
                                <tr key={product._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={product.imageURL}
                                            alt={product.title}
                                            className="h-16 w-16 object-cover mx-auto"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleRemoveFromWishlist(product._id)}
                                                className="text-red-500 hover:text-red-700 md:hidden"
                                                aria-label="Remove from Wishlist"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(product._id)}
                                                className="text-blue-500 hover:text-blue-700 md:hidden"
                                                aria-label="Add to Cart"
                                            >
                                                <FaCartPlus size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveFromWishlist(product._id)}
                                                className="hidden md:inline-block bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(product._id)}
                                                className="hidden md:inline-block bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default MyWishList;
