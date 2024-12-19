import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';

const SignIn = () => {
    // Use the useForm hook from react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Form submit handler
    const submitHandler = (data) => {
        console.log('Form data:', data);
    };

    // Google Login success handler
    const handleGoogleLogin = () => {
        console.log('Google login initiated');
    };

    return (
        <div className="max-w-sm mx-auto mt-12 p-6  mb-10 rounded-lg shadow-md">
            <form className="space-y-4 " onSubmit={handleSubmit(submitHandler)}>
                {/* Email input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            }
                        })}
                        className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Password input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8characters'
                            }
                        })}
                        className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-md"
                >
                    Sign In
                </button>
            </form>

            {/* Google login button with icon */}
            <div className="mt-6 flex items-center justify-center space-x-2">
                <button
                    onClick={handleGoogleLogin}
                    className="w-full px-4 py-2 text-white bg-red-500 rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 shadow-md"
                >
                    <FaGoogle className="text-xl" /> {/* Google icon */}
                    <span>Sign in with Google</span>
                </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
