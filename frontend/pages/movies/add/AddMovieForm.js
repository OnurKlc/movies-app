import {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import styles from "./AddMovieForm.module.css";
import axios from "axios";
import {GlobalContext} from "../../../core/context/GlobalContext";
import { Select, DatePicker } from 'antd';
const { Option } = Select;

const AddMovie = () => {
    const router = useRouter();
    const {user, genres, theatres, movies} = useContext(GlobalContext)
    const [movieData, setMovieData] = useState({
        movie_name: '',
        theatre_id: '',
        timeslot: '',
        duration: '',
        date: dayjs(),
        genres: '',
        predecessor_id: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        movieData.director = user.get()?.username
        movieData.platform_id = user.get()?.platform_id

        axios.post('http://localhost:9000/movies/create', movieData)

        setMovieData({
            movie_name: '',
            theatre_id: '',
            timeslot: '',
            duration: '',
            date: '',
            genres: '',
            predecessor_id: ''
        });

        router.push('/movies/list');
    };

    const getGenres = () => {
        axios.get('http://localhost:9000/genre').then(res => genres.set(res.data))
    }

    const getTheatres = () => {
        axios.get('http://localhost:9000/theatres').then(res => theatres.set(res.data))
    }

    const getMovies = () => {
        axios.get('http://localhost:9000/movies').then(res => movies.set(res.data))
    }

    useEffect(() => {
        getGenres()
        getTheatres()
        getMovies()
    }, [])

    return (
        <div className={styles.addMovieForm}>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="theatre_id">Theatre:</label>
                    <Select
                        className={styles.antSelect}
                        onChange={(value) => setMovieData({ ...movieData, theatre_id: value })}
                    >
                        {theatres.get().map(theatre => (
                            <Option key={theatre.theatre_id} value={theatre.theatre_id}>
                                {theatre.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Date:</label>
                    <DatePicker
                        id="date"
                        name="date"
                        className={styles.antPicker}
                        value={dayjs(movieData.date)}
                        onChange={(date, dateString) => setMovieData({ ...movieData, date: dateString })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="timeslot">Time Slot:</label>
                    <Select
                        id="timeslot"
                        className={styles.antSelect}
                        name="timeslot"
                        value={movieData.timeslot}
                        onChange={(value) => setMovieData({ ...movieData, timeslot: value })}
                    >
                        <Option value="1">Slot 1</Option>
                        <Option value="2">Slot 2</Option>
                        <Option value="3">Slot 3</Option>
                        <Option value="4">Slot 4</Option>
                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="duration">Duration:</label>
                    <Select
                        id="duration"
                        className={styles.antSelect}
                        name="duration"
                        value={movieData.duration}
                        onChange={(value) => setMovieData({ ...movieData, duration: value })}
                    >
                        <Option value="1">1 slot</Option>
                        <Option value="2">2 slots</Option>
                        <Option value="3">3 slots</Option>
                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="platform">Genre:</label>
                    <Select
                        className={styles.antSelect}
                        mode="multiple"
                        onChange={(value) => setMovieData({ ...movieData, genres: value })}
                    >
                        {genres.get().map(genre => (
                            <Option key={genre.genre_id} value={genre.genre_id}>
                                {genre.genre_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="platform">Predecessor:</label>
                    <Select
                        className={styles.antSelect}
                        mode="multiple"
                        onChange={(value) => setMovieData({ ...movieData, predecessor_id: value })}
                    >
                        {movies.get().map(movie => (
                            <Option key={movie.movie_id} value={movie.movie_id}>
                                {movie.movie_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <button type="submit" className={styles.addButton}>Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
