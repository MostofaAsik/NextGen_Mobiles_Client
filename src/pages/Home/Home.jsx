import React from 'react';
import Banner from '../../components/Banner';
import FeaturedProducts from '../../components/FeaturedProducts';
import Testimonials from '../../components/Testimonials ';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts />
            <Testimonials />
        </div>
    );
};

export default Home;