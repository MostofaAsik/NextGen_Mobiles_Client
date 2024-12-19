import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';


const MainLayout = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;