import { useRouter } from 'next/router';
import styles from './ListUsers.module.css';
import {GlobalContext} from "../../../core/context/GlobalContext";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import { Table, Select } from "antd";
import axios from "axios";
import PrivateRoute from "../../PrivateRoute";

const { Option } = Select;

const ListUsers = () => {
    const router = useRouter();
    const {usersList, platforms, user} = useContext(GlobalContext);
    const [filterUserType, setFilterUserType] = useState("");

    const handleFilterChange = (value) => {
        setFilterUserType(value);
    };

    const deleteUser = (val) => {
        axios.delete(`http://localhost:9000/users/${val}`).then(res => getUsers())
    }

    const getUsers = () => {
        axios.get('http://localhost:9000/users').then(res => usersList.setUsers(res.data))
    }

    const getPlatforms = () => {
        axios.get('http://localhost:9000/platforms').then(res => platforms.set(res.data))
    }

    const filteredUsers = filterUserType
        ? usersList.getValue().filter((user) => user.user_type === filterUserType)
        : usersList.getValue();

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Nation',
            dataIndex: 'nation',
            key: 'nation',
        },
        {
            title: 'User Type',
            dataIndex: 'user_type',
            key: 'user_type',
        },
        {
            title: 'Platform Id',
            dataIndex: 'platform',
            key: 'platform_id',
            render: (_, record) => (
                <span>
                    {record.user_type === 'director' ? record.platform_id : record.platform_ids}
                </span>
            )
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <>
                    {record.user_type !== 'manager' && user.get()?.user_type === 'manager' && <a onClick={() => deleteUser(record.username)} className={styles.button}>Delete</a>}
                    {record.user_type === 'director' && user.get()?.user_type === 'manager' && <a onClick={() => router.push(`/user/update/${record.username}`)}
                                                          className={styles.button}>Update</a>}
                    {record.user_type === 'audience' && user.get()?.user_type === 'manager' && (
                        <a
                            onClick={() => router.push(`/movies/rated/${record.username}`)}
                            className={styles.button}
                        >
                            View user ratings
                        </a>)}
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
        <div className={styles.listUsers}>
            <h1>Users List:</h1>
            {user.get()?.user_type === 'manager' && <Link href="/user/add" className={styles.button}>
                Add User
            </Link>}
            <div className={styles.filterContainer}>
                <span>Filter by User Type:</span>
                <Select
                    value={filterUserType}
                    onChange={handleFilterChange}
                    className={styles.filterDropdown}
                >
                    <Option value="">All</Option>
                    <Option value="director">Director</Option>
                    <Option value="audience">Audience</Option>
                </Select>
            </div>
            <Table dataSource={filteredUsers} columns={columns} />
        </div>
        </PrivateRoute>
    );
};

export default ListUsers;
