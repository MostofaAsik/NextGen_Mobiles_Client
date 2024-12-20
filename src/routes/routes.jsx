import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/DashBoard";
import Overview from "../pages/DashBoard/Overview";
import AddProduct from "../pages/DashBoard/Seller/AddProduct";
import MyProducts from "../pages/DashBoard/Seller/MyProducts";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/contact',
                element: <ContactUs />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        children: [
            //common route
            {
                path: '/dashboard/overview',
                element: <Overview />
            },
            //seller route
            {
                path: '/dashboard/add-product',
                element: <AddProduct />
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts />
            },
        ]
    }
])
export default router