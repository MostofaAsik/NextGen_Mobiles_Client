import { useEffect, useState } from 'react';

import axios from 'axios';
import useAuth from './useAuth';

const useUserData = () => {
    const { user, loading: authLoading } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${user?.email}`);
                setUserData(res.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email && !authLoading) {
            fetchData();
        }

    }, [user, authLoading]);


    return { userData, loading };
};

export default useUserData;
