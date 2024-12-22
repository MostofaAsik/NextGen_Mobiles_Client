import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const CheckoutForm = ({ totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe is not loaded yet.');
            return;
        }

        try {

            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/create-payment`, {
                amount: totalPrice * 100,
                currency: 'usd',
            });

            const { clientSecret } = data;


            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error('Payment error:', result.error.message);
                toast.error('Payment failed: ' + result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                toast.success('Payment successful!');
                event.target.reset()
            }
        } catch (error) {
            console.error('Error during payment:', error);
            toast.error('An error occurred while processing payment.');
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto bg-white">
            <h2 className="text-lg font-semibold mb-4 text-center">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Card Details</label>
                    <div className="p-2 border rounded-lg bg-gray-50">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                        fontSmoothing: 'antialiased',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                                hidePostalCode: true,
                            }}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                    disabled={!stripe}
                >
                    Pay ${totalPrice.toFixed(2)}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CheckoutForm;
