import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
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
}])
export default router