import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import useUserData from '../../../hooks/useUserData';
import { FaTrash, FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Loader from '../../../components/Loader';
import Swal from 'sweetalert2';

const MyWishList = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const { userData } = useUserData();
    const userId = userData?._id;
    const userEmail = userData?.email;
    console.log(userEmail);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('access-token'); // Get JWT token

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setWishlist(response.data);
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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('access-token');
                    const response = await axios.delete(`https://next-gen-mobiles-server.vercel.app/${userId}/${productId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (response.data.success) {
                        setWishlist(wishlist.filter(product => product._id !== productId));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The product has been removed from your wishlist.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error('Failed to remove product from wishlist', error);

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to remove product from wishlist. Please try again later.'
                    });
                }
            }
        });
    };

    const handleAddToCart = async (productId) => {
        try {
            if (!userEmail) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Not Logged In',
                    text: 'Please log in to add items to the cart.',
                });
                return;
            }

            const product = wishlist.find(item => item._id === productId);

            if (!product) {
                Swal.fire({
                    icon: 'error',
                    title: 'Product Not Found',
                    text: 'The product could not be found in your wishlist.',
                });
                return;
            }

            const token = localStorage.getItem('access-token');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/add-to-cart`,
                { userEmail, productId, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                Swal.fire({
                    title: 'Added to Cart!',
                    text: 'The product has been added to your cart.',
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Add to Cart',
                    text: response.data.message || 'An error occurred while adding the product to the cart.',
                });
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again later.',
            });
        }
    };


    if (loading) {
        return <div className="text-center text-lg font-semibold"><Loader /></div>;
    }

    if (error) {
        return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
    }

    return (
        <div className="container mx-auto px-0 pt-4">
            <h2 className="text-3xl font-bold text-center mb-6">My WishList</h2>

            {wishlist.length === 0 ? (
                <p className="text-center text-gray-500">No items in your wishlist</p>
            ) : (
                <div className="overflow-x-auto ">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-2 py-2">Image</th>
                                <th className="border border-gray-300 px-2 py-2">Title</th>
                                <th className="border border-gray-300 px-2 py-2">Price</th>
                                <th className="border border-gray-300 px-2 py-2">Stock</th>
                                <th className="border border-gray-300 px-2 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map((product) => (
                                <tr key={product._id} className="text-center">
                                    {/* Mobile: Image and Title in Column */}
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="block md:flex md:items-center">
                                            <img
                                                onClick={() => navigate(`/product/${product._id}`)}
                                                src={product.imageURL}
                                                alt={product.title}
                                                className="h-16 w-16 object-cover mx-auto cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="md:hidden">{product.title}</div>
                                        <div className="hidden md:block">{product.title}</div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {/* Action Buttons */}
                                        <div className="flex flex-col md:flex-row justify-center gap-2">
                                            {/* Mobile Icon Buttons */}
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

                                            {/* Desktop Buttons */}
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
