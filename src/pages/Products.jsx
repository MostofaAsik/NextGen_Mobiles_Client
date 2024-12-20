import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaFilter, FaHeart } from 'react-icons/fa';
import useUserData from '../hooks/useUserData';
import SearchBar from './SearchBar';
import Loader from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [category, setCategory] = useState('All');
    const [brand, setBrand] = useState('All');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 3;

    const { userData } = useUserData()


    // Fetch products based on filters, sort, and pagination
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                title: searchQuery,
                sort: sortOption === 'price-low-to-high' ? 'asc' : sortOption === 'price-high-to-low' ? 'desc' : null,
                category: category !== 'All' ? category : '',
                brand: brand !== 'All' ? brand : '',
                page: page,
                limit: itemsPerPage,
            };

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-products`, { params });

            setProducts(response.data.products);
            setBrands(response.data.brands);
            setCategories(response.data.categories);
            setTotalPages(Math.ceil(response.data.totalProduct / itemsPerPage)); // Calculate total pages
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };



    const addToWishlist = async (product) => {
        console.log(userData?.email);


        const token = localStorage.getItem('access-token');
        console.log(token);
        // Check if the token is available
        if (!token) {
            toast.error('You need to be logged in to add to wishlist.');
            return;
        }

        try {
            const response = await axios.patch(
                'http://localhost:5000/wishlist',
                { userEmail: userData?.email, productId: product._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Check if the response was successful
            console.log("Response:", response);
            if (response.data.acknowledged) {
                toast.success('Product added to wishlist');
            } else {
                toast.error(response.data.message || 'Failed to add product to wishlist');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            toast.error('Failed to add product to wishlist');
        }
    };




    useEffect(() => {
        fetchProducts();
    }, [searchQuery, sortOption, category, brand, page]);

    const handleSortChange = (e) => setSortOption(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleBrandChange = (e) => setBrand(e.target.value);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSortOption('default');
        setCategory('All');
        setBrand('All');
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            window.scroll({ top: 0, behavior: 'smooth' });
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-center">Our Products</h1>
            </header>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <SearchBar setSearchQuery={setSearchQuery} />
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="mt-4 md:mt-0 p-2 border border-gray-300 rounded-lg shadow-sm"
                >
                    <option value="default">Sort By Price</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <aside className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 flex items-center"><FaFilter className="mr-2" /> Filter</h2>
                    <label className="block mb-2 font-semibold">Category</label>
                    <select value={category} onChange={handleCategoryChange} className="w-full p-2 border rounded-lg mb-4">
                        <option value=''>All</option>
                        {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                    </select>
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select value={brand} onChange={handleBrandChange} className="w-full p-2 border rounded-lg mb-4">
                        <option value=''>All</option>
                        {brands.map((brand, i) => <option key={i} value={brand}>{brand}</option>)}
                    </select>
                    <button onClick={handleResetFilters} className="w-full bg-red-500 text-white font-bold py-2 rounded-lg">Reset Filters</button>
                </aside>

                <section className="col-span-3">
                    {loading && <Loader />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                                <img src={product.imageURL} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-gray-800 font-bold">${product.price}</p>

                                {/* Add to Wishlist Button */}
                                <button
                                    onClick={() => addToWishlist(product)}
                                    className="flex items-center justify-center bg-red-500 text-white font-bold py-2 px-4 rounded-lg w-full mt-2 hover:bg-red-600"
                                >
                                    <FaHeart className="mr-2" /> Add to Wishlist
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <FaArrowLeft className="mr-2" />
                            Previous
                        </button>

                        <span className="text-lg font-bold bg-gray-100 px-4 py-2 rounded-lg shadow-md">
                            {page} / {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Next
                            <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                    <ToastContainer />
                </section>
            </div>
        </div>
    );
};

export default Products;
