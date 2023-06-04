import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../user/add/AddUserForm.module.css';
import axios from 'axios';
import PrivateRoute from '../../PrivateRoute';

const AddTheatre = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [district, setDistrict] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTheatre = {
            name,
            district,
            capacity: parseInt(capacity),
        };

        try {
            await axios.post('http://localhost:9000/theatres/create', newTheatre);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error creating theatre:', error);
        }

        setName('');
        setDistrict('');
        setCapacity('');
    };

    return (
        <PrivateRoute>
            <div className={styles.addUserForm}>
                <h2>Add New Theatre</h2>
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="district">District:</label>
                        <input
                            type="text"
                            id="district"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="capacity">Capacity:</label>
                        <input
                            type="number"
                            id="capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.addButton}>
                        Add Theatre
                    </button>
                </form>
            </div>
        </PrivateRoute>
    );
};

export default AddTheatre;
