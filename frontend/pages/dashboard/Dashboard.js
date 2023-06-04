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
            {user.getValue()?.user_type === 'manager' && <Link href="/theatre/add" className={styles.button}>
                Create A Theatre
            </Link>}
        </PrivateRoute>
    );
};

export default Dashboard;
