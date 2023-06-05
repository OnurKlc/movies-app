import {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './UpdateUser.module.css';
import {GlobalContext} from "../../../core/context/GlobalContext";
import PrivateRoute from "../../PrivateRoute";
import {Select} from "antd";
import axios from "axios";

const UpdateUser = () => {
    const router = useRouter();
    const {platforms} = useContext(GlobalContext);
    const [userData, setUserData] = useState({
        username: '',
        platform_id: ''
    });

    useEffect(() => {
        fetchPlatforms();
        getUser()
    }, []);

    const fetchPlatforms = async () => {
        try {
            const response = await axios.get('http://localhost:9000/platforms');
            platforms.set(response.data);
        } catch (error) {
            console.error('Error fetching platforms:', error);
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/users/${router.query.username}`);
            setUserData(response.data)
        } catch (error) {
            console.error('Error fetching the user:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9000/users/${userData.username}`, {platform_id: userData.platform_id})
    };

    return (
        <PrivateRoute>
            <div className={styles.addUserForm}>
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            disabled
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="platform">Platform:</label>
                        <Select
                            className={styles.antSelect}
                            onChange={(val) => setUserData({ ...userData, platform_id: val })}
                            value={userData.platform_id}
                        >
                            {platforms.get().map(platform => (
                                <Option key={platform.platform_id} value={platform.platform_id}>
                                    {platform.platform_name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <button type="submit" className={styles.addButton}>Update User</button>
                </form>
            </div>
        </PrivateRoute>
    );
};

export default UpdateUser;
