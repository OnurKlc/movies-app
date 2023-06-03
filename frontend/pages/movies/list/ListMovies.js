import { useRouter } from 'next/router';
import styles from './ListMovies.module.css';
import {GlobalContext} from "../../../core/context/GlobalContext";
import Link from "next/link";
import {useContext} from "react";
import {Table} from "antd";

const ListMovies = () => {
    const router = useRouter();
    const {moviesList} = useContext(GlobalContext);
    const director = router?.query?.director

    const filteredMovies = moviesList.getValue().filter(
        (movie) => director ? movie.director === director : true
    );

    const columns = [
        {
            title: 'Movie Id',
            dataIndex: 'movieId',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'movieName',
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
                    <a onClick={() => moviesList.deleteMovie(record.username)} className={styles.button}>Delete</a>
                    <a onClick={() => router.push(`/user/update/${record.username}`)} className={styles.button}>Update</a>
                    {record.userType === 'audience' && <a onClick={() => router.push(`/user/update/${record.username}`)} className={styles.button}>
                        View user ratings</a>}
                    {record.userType === 'director' && <a onClick={() => router.push(`/user/update/${record.username}`)} className={styles.button}>
                        View movies of director</a>}
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>Movies List:</h1>
            <Link href="/movies/add" className={styles.button}>
                Add Movie
            </Link>
            <Table dataSource={filteredMovies} columns={columns} />
        </div>
    );
};

export default ListMovies;
