import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

const buyerRoutes = [
    {
        id: 1,
        title: 'Wishlist',
        icon: AiOutlineHeart,
        path: '/dashboard/wishlist'
    },
    {
        id: 2,
        title: 'My Cart',
        icon: AiOutlineShoppingCart,
        path: '/dashboard/my-orders'
    }
];

export default buyerRoutes;
