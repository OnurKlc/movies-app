import {useContext, useEffect} from 'react';
import { useRouter } from 'next/router';
import {GlobalContext} from "../core/context/GlobalContext";

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const {user} = useContext(GlobalContext)

    useEffect(() => {
        const isLoggedIn = user.getValue()
        // if (!isLoggedIn) {
        //     router.push('/');
        // }
    }, []);

    return <>{children}</>;
};

export default PrivateRoute;
