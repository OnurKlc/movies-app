import Link from 'next/link';
import {useContext} from "react";
import {GlobalContext} from "../../core/context/GlobalContext";
import styles from "./Dashboard.module.css"

const Dashboard = () => {
    const {usersList} = useContext(GlobalContext)

    return (
        <div>
            <h1>Dashboard</h1>
            <Link href="/user/list" className={styles.button}>
                View Users
            </Link>
            <Link href="/movies/list" className={styles.button}>
                View Movies
            </Link>
        </div>
    );
};

export default Dashboard;
