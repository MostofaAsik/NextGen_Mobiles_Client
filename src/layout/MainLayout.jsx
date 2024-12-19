import React from 'react';
import { Outlet } from 'react-router';


const MainLayout = () => {
    return (
        <div>
            <div>
                <h2>Navbar</h2>
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