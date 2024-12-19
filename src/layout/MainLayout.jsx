import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar';


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
                <h2>Footer</h2>
            </div>
        </div>
    );
};

export default MainLayout;