import {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './AddUserForm.module.css';
import axios from "axios";
import PrivateRoute from "../../PrivateRoute";
import {Select} from "antd";
const {Option} = Select;

const AddUserForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [userType, setUserType] = useState('');
    const [nation, setNation] = useState('');
    const [platform, setPlatform] = useState('');
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        fetchPlatforms();
    }, []);

    const fetchPlatforms = async () => {
        try {
            const response = await axios.get('http://localhost:9000/platforms');
            setPlatforms(response.data);
        } catch (error) {
            console.error('Error fetching platforms:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            name,
            surname,
            user_type: userType,
        };

        if (userType === 'director') {
            newUser.platform_id = platform
            newUser.nation = nation
        }

        axios.post('http://localhost:9000/users/create', newUser)

        setUsername('');
        setPassword('');
        setName('');
        setSurname('');
        setUserType('');
        setNation('');
        setPlatform('');

        router.push('/user/list');
    };

    return (
        <PrivateRoute>
        <div className={styles.addUserForm}>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="userType">User Type:</label>
                    <Select className={styles.antSelect} id="userType" value={userType} onChange={(val) => setUserType(val)}>
                        <Option value="director">Director</Option>
                        <Option value="audience">Audience</Option>
                    </Select>
                </div>
                {userType === 'director' && <div className={styles.formGroup}>
                    <label htmlFor="nation">Nation:</label>
                    <input type="text" id="nation" value={nation} onChange={(e) => setNation(e.target.value)} />
                </div>}
                {userType === 'director' && <div className={styles.formGroup}>
                    <label htmlFor="platform">Platform:</label>
                    <Select className={styles.antSelect} onChange={(val) => setPlatform(val)}>
                        {platforms.map(platform => (
                            <Option key={platform.platform_id} value={platform.platform_id}>
                                {platform.platform_name}
                            </Option>
                        ))}
                    </Select>
                </div>}
                <button type="submit" className={styles.addButton}>Add User</button>
            </form>
        </div>
        </PrivateRoute>
    );
};

export default AddUserForm;
