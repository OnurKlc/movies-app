import Link from "next/link";
import {useContext} from "react";
import {GlobalContext} from "../context/GlobalContext";
import {useRouter} from "next/router";

const Header = () => {
    const {user} = useContext(GlobalContext)
    const router = useRouter()

    return (
        <header className={'header'}>
            {user.get() && <>
                <Link href={'/'}>Homepage</Link>
                <button onClick={() => {
                    user.set(null)
                    localStorage.removeItem('user')
                    router.push('/');
                }}>
                    Logout
                </button>
            </>}
        </header>
    );
};

export default Header
