import { useRouter } from 'next/router';
import styles from './ListTickets.module.css';
import {GlobalContext} from "../../../core/context/GlobalContext";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import { Table, Select } from "antd";
import axios from "axios";
import PrivateRoute from "../../PrivateRoute";

const { Option } = Select;

const ListTickets = () => {
    const router = useRouter();
    const {usersList, platforms, user} = useContext(GlobalContext);
    const [tickets, setTickets] = useState([]);

    const deleteUser = (val) => {
        axios.delete(`http://localhost:9000/users/${val}`).then(res => getUsers())
    }

    const getUsers = () => {
        axios.get('http://localhost:9000/users').then(res => usersList.setUsers(res.data))
    }

    const getPlatforms = () => {
        axios.get('http://localhost:9000/platforms').then(res => platforms.set(res.data))
    }

    const columns = [
        {
            title: 'Movie Id',
            dataIndex: 'movie_id',
            key: 'movie_id',
        },
        {
            title: 'Mavie Name',
            dataIndex: 'movie_name',
            key: 'movie_name',
        },
        {
            title: 'Session Id',
            dataIndex: 'session_id',
            key: 'session_id',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Overall Rating',
            dataIndex: 'avg_rating',
            key: 'avg_rating',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <>
                    {record.user_type !== 'manager' && <a onClick={() => deleteUser(record.username)} className={styles.button}>Delete</a>}
                    {record.user_type !== 'manager' && <a onClick={() => router.push(`/user/update/${record.username}`)}
                                                          className={styles.button}>Update</a>}
                    {record.user_type === 'audience' && <a onClick={() => router.push(`/movies/list/${record.username}`)} className={styles.button}>
                        View user ratings</a>}
                    {record.user_type === 'director' && <a onClick={() => router.push({pathname: `/movies/list/`, query: { director: `${record.username}` }})} className={styles.button}>
                        View movies of director</a>}
                </>
            ),
        },
    ];

    useEffect(() => {
        getPlatforms()
        getUsers()
    }, [])

    return (
        <PrivateRoute>
            <div>
                <h1>Bought Tickets:</h1>
                {user.get()?.user_type === 'audience' && <Link href="/tickets/buy" className={styles.button}>
                    Buy New Ticket
                </Link>}
                <Table dataSource={tickets} columns={columns} />
            </div>
        </PrivateRoute>
    );
};

export default ListTickets;
