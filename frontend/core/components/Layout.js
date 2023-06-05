import DashboardPage from "../../pages/dashboard";
import LoginPage from "../../pages/login";
import {useContext} from "react";
import {GlobalContext} from "../context/GlobalContext";
import {useRouter} from "next/router";

const Layout = () => {
    const {user} = useContext(GlobalContext)
    const router = useRouter()

    if (!user.get() && router.pathname !== '/') {
        router.push('/');
        return null;
    }

    return (
        <div>
            {user.get() ? (
                <DashboardPage />
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default Layout
