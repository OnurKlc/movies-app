import {useEffect} from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user')
        if (!isLoggedIn) {
            router.push('/');
        }
    }, []);

    return <>{children}</>;
};

export default PrivateRoute;
