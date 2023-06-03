import {useContext, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import {GlobalContext} from "../../core/context/GlobalContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const {user} = useContext(GlobalContext)

    const handleLogin = () => {
        user.set(true)
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>Login Page</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleLogin} className={styles.button}>Login</button>
            </div>
        </div>
    );
};

export default Login;
