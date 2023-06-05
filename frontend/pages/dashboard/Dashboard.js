import Link from 'next/link';
import styles from "./Dashboard.module.css"
import PrivateRoute from "../PrivateRoute";
import {useContext} from "react";
import {GlobalContext} from "../../core/context/GlobalContext";

const Dashboard = () => {
    const {user} = useContext(GlobalContext)

    return (
        <PrivateRoute>
            <h1>Dashboard</h1>
            <Link href="/user/list" className={styles.button}>
                View Users
            </Link>
            <Link href="/movies/list" className={styles.button}>
                View Movies
            </Link>
            {user.get()?.user_type === 'audience' && <Link href="/tickets/list" className={styles.button}>
                View Tickets
            </Link>}
            {user.get()?.user_type === 'manager' && <Link href="/theatre/add" className={styles.button}>
                Create A Theatre
            </Link>}
            {user.get()?.user_type === 'audience' && <Link href="/platforms" className={styles.button}>
                Subscribe to platforms
            </Link>}
        </PrivateRoute>
    );
};

export default Dashboard;
