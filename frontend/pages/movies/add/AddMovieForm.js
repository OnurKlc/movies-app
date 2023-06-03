import {useContext, useState} from 'react';
import { useRouter } from 'next/router';
import styles from "./AddMovieForm.module.css";
import {GlobalContext} from "../../../core/context/GlobalContext";
import axios from "axios";

const AddMovie = () => {
    const router = useRouter();
    const {moviesList} = useContext(GlobalContext)
    const [movieData, setMovieData] = useState({
        movie_id: '',
        movie_name: '',
        director: '',
        theatreId: '',
        timeSlot: '',
        duration: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        moviesList.addMovie(movieData);
        axios.post('http://localhost:9000/movies/create', movieData)

        setMovieData({
            movie_id: '',
            movie_name: '',
            director: '',
            theatreId: '',
            timeSlot: '',
            duration: '',
            date: ''
        });

        // Redirect to the desired page (e.g., movie list page)
        router.push('/movies/list');
    };

    return (
        <div className={styles.addMovieForm}>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="movie_id">Movie ID:</label>
                    <input
                        type="text"
                        id="movie_id"
                        name="movie_id"
                        value={movieData.movie_id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="movie_name">Movie Name:</label>
                    <input
                        type="text"
                        id="movie_name"
                        name="movie_name"
                        value={movieData.movie_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="director">Director:</label>
                    <input
                        type="text"
                        id="director"
                        name="director"
                        value={movieData.director}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="theatreId">Theatre ID:</label>
                    <input
                        type="text"
                        id="theatreId"
                        name="theatreId"
                        value={movieData.theatreId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="timeSlot">Time Slot:</label>
                    <input
                        type="text"
                        id="timeSlot"
                        name="timeSlot"
                        value={movieData.timeSlot}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={movieData.duration}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={movieData.date}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.addButton}>Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
