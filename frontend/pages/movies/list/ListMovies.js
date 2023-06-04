import { useRouter } from 'next/router';
import styles from './ListMovies.module.css';
import {GlobalContext} from "../../../core/context/GlobalContext";
import Link from "next/link";
import {useContext, useEffect} from "react";
import {Table} from "antd";
import axios from "axios";

const ListMovies = () => {
    const router = useRouter();
    const {user, movies} = useContext(GlobalContext);
    const director = router?.query?.director

    const filteredMovies = movies.get().filter(
        (movie) => director ? movie.director === director : true
    );

    const deleteMovie = (val) => {
        axios.delete(`http://localhost:9000/movies/${val}`).then(res => getMovies())
    }

    const getMovies = () => {
        axios.get('http://localhost:9000/movies').then(res => movies.set(res.data))
    }

    const columns = [
        {
            title: 'Movie Id',
            dataIndex: 'movie_id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'movie_name',
            key: 'name',
        },
        {
            title: 'Director',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Theatre Id',
            dataIndex: 'theatreId',
            key: 'theatreId',
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Time Slot',
            dataIndex: 'timeSlot',
            key: 'timeSlot',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },{
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <>
                    <a onClick={() => deleteMovie(record.movie_id)} className={styles.button}>Delete</a>
                    <a onClick={() => router.push(`/movies/update/${record.movie_id}`)} className={styles.button}>Update</a>
                </>
            ),
        },
    ];

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div>
            <h1>Movies List:</h1>
            {user.getValue()?.user_type === 'director' && <Link href="/movies/add" className={styles.button}>
                Add Movie
            </Link>}
            <Table dataSource={filteredMovies} columns={columns} />
        </div>
    );
};

export default ListMovies;
