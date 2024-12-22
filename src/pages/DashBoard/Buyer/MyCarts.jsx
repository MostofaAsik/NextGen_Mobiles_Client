import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useUserData from '../../../hooks/useUserData';
import { FaTrashAlt } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const MyCarts = () => {
    const { userData } = useUserData();
    const userEmail = userData?.email;
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISH_KEY}`);

    useEffect(() => {
        if (!userEmail) return;

        const fetchCartData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('access-token');
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/cart/${userEmail}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    setCartItems(response.data.cart);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Fetch Cart',
                        text: response.data.message || 'Could not retrieve cart data.',
                    });
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while fetching the cart data.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [userEmail]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartItems]);



    const combineCartItems = () => {
        const combinedItems = cartItems.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        return combinedItems;
    };

    const combinedCartItems = combineCartItems();

    // Remove item from cart
    const removeFromCart = async (productId) => {
        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/cart/${userEmail}/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                // Remove item from the local state
                setCartItems(cartItems.filter(item => item.productId !== productId));
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product removed from cart.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message || 'Failed to remove product.',
                });
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while removing the product from the cart.',
            });
        }
    };


    // payemnt 




    if (loading) {
        return <div>Loading your cart...</div>;
    }


    return (
        <div className="container mx-auto px-1">
            <h2 className="text-2xl font-semibold mb-4 text-center">My Cart</h2>
            {combinedCartItems.length > 0 ? (
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border-b">Image</th>
                            <th className="px-4 py-2 border-b hidden sm:table-cell">Title</th>
                            <th className="px-4 py-2 border-b hidden sm:table-cell">Price</th>
                            <th className="px-4 py-2 border-b">Quantity</th>
                            <th className="px-4 py-2 border-b">Total Price</th>
                            <th className="px-4 py-2 border-b">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedCartItems.map((item) => (
                            <tr key={item.productId} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">
                                    <img
                                        src={item.imageURL}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                </td>
                                <td className="px-4 py-2 border-b hidden sm:table-cell">{item.title}</td>
                                <td className="px-4 py-2 border-b hidden sm:table-cell">${item.price}</td>
                                <td className="px-4 py-2 border-b">{item.quantity}</td>
                                <td className="px-4 py-2 border-b">${(item.price * item.quantity).toFixed(2)}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 focus:outline-none"
                                        onClick={() => removeFromCart(item.productId)}
                                    >
                                        <FaTrashAlt className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="mt-6 text-left md:text-right mb-3">
                <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
            </div>
            {/* Checkout Section */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
                <Elements stripe={stripePromise}>
                    <h3 className="text-lg font-semibold text-center mb-4">Checkout</h3>
                    <CheckoutForm totalPrice={totalPrice} />
                </Elements>
            </div>
        </div>
    );
};

export default MyCarts;
