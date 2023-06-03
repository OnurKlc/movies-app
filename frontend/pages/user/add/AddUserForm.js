import {useContext, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './AddUserForm.module.css';
import {GlobalContext} from "../../../core/context/GlobalContext";
import axios from "axios";

const AddUserForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [userType, setUserType] = useState('');
    const [nation, setNation] = useState('');
    const [platform, setPlatform] = useState('');
    const {usersList} = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            name,
            surname,
            nation,
            user_type: userType,
            platform_id: platform
        };

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
                    <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Select User Type</option>
                        <option value="director">Director</option>
                        <option value="audience">Audience</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="nation">Nation:</label>
                    <input type="text" id="nation" value={nation} onChange={(e) => setNation(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="platform">Platform:</label>
                    <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        <option value="">Select Platform</option>
                        <option value="10130">IMDB</option>
                        <option value="10131">Letterboxd</option>
                        <option value="10132">FilmIzle</option>
                    </select>
                </div>
                <button type="submit" className={styles.addButton}>Add User</button>
            </form>
        </div>
    );
};

export default AddUserForm;
