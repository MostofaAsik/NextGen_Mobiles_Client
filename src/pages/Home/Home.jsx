import React from 'react';
import Banner from '../../components/Banner';
import FeaturedProducts from '../../components/FeaturedProducts';
import Testimonials from '../../components/Testimonials ';
import Categories from '../../components/Categories';
import FAQ from '../../components/FAQ';
import ContactInfo from '../../components/ContactInfo';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts />
            <Testimonials />
            <Categories />
            <FAQ />
            <ContactInfo />
        </div>
    );
};

export default Home;