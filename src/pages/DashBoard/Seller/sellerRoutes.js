import { AiOutlineAppstore, AiOutlineShoppingCart } from 'react-icons/ai';

const sellerRoutes = [
    {
        id: 1,
        title: 'Add Products',
        icon: AiOutlineAppstore,
        path: '/dashboard/add-product'
    },
    {
        id: 2,
        title: 'My Products',
        icon: AiOutlineShoppingCart,
        path: '/dashboard/my-products'
    }
];

export default sellerRoutes;
