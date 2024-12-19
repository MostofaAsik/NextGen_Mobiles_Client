import React from 'react';
import Banner from '../../components/Banner';
import FeaturedProducts from '../../components/FeaturedProducts';
import Testimonials from '../../components/Testimonials ';
import Categories from '../../components/Categories';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts />
            <Testimonials />
            <Categories />
        </div>
    );
};

export default Home;