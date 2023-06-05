import styles from "../../user/add/AddUserForm.module.css";
import {Select} from "antd";
import PrivateRoute from "../../PrivateRoute";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../core/context/GlobalContext";
import axios from "axios";
const {Option} = Select

export default function BuyTicket() {
    const {user, movies, theatres} = useContext(GlobalContext);
    const [movie, setMovie] = useState()

    const handleSubmit = () => {
        const { username } = user.get();
        const { movie_id } = movie;

        const data = { username, movie_id };
        axios.post('http://localhost:9000/tickets/buy', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const getMovies = () => {
        axios.get('http://localhost:9000/movies').then(res => movies.set(res.data))
    }

    const getTheatres = () => {
        axios.get('http://localhost:9000/theatres').then(res => theatres.set(res.data))
    }

    useEffect(() => {
        getTheatres()
        getMovies()
    }, [])

    return (
        <PrivateRoute>
            <div className={styles.addUserForm}>
                <h2>Buy Ticket</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="platform">Movies:</label>
                    <Select
                        className={styles.antSelect}
                        onChange={(val) => setMovie(movies.get().find(movie => movie.movie_id === val))}
                    >
                        {movies.get().map(movie => (
                            <Option key={movie.movie_id} value={movie.movie_id}>
                                {movie.movie_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label>Movie Date:</label>
                    <input
                        type="text"
                        disabled
                        value={movie?.date}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="platform">Timeslot:</label>
                    <input
                        type="text"
                        disabled
                        value={movie?.timeslot}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Theatre:</label>
                    <input
                        type="text"
                        disabled
                        value={theatres.get().find(item => item.theatre_id === movie?.theatre_id)?.name}
                    />
                </div>
                <button type="submit" className={styles.addButton} onClick={handleSubmit}>Buy</button>
            </div>
        </PrivateRoute>
    )
}
