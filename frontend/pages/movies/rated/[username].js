import { useRouter } from 'next/router';
import {useContext, useEffect, useState} from "react";
import {Table} from "antd";
import axios from "axios";

const ListRatedMovies = () => {
    const router = useRouter();
    const [data, setData] = useState()
    const username = router?.query?.username

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
            title: 'Rating',
            dataIndex: 'rating_value',
            key: 'rating_value',
        }
    ];

    const getRatedMovies = () => {
        axios.get(`http://localhost:9000/movies/rated/${username}`)
            .then(res => setData(res.data))
    }

    useEffect(() => {
        getRatedMovies()
    }, [])

    return (
        <div>
            <h1>Movies Rated by {username}:</h1>
            <Table dataSource={data} columns={columns} />
        </div>
    );
};

export default ListRatedMovies;
