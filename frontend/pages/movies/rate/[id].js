import {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from "./RateMovie.module.css";
import axios from "axios";
import {GlobalContext} from "../../../core/context/GlobalContext";
import {message, Rate} from 'antd';
import PrivateRoute from "../../PrivateRoute";

const RateMovie = () => {
    const router = useRouter();
    const {user} = useContext(GlobalContext)
    const [rating, setRating] = useState(0);

    const onRatingChange = (rating_value) => {
        setRating(rating_value)
        axios.post('http://localhost:9000/rating/rate', {
            rating_value,
            username: user.get()?.username,
            movie_id: router?.query?.id
        })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                message.error({
                    type: 'error',
                    content: err.response.data.error
                })
            })
    }

    const getRating = () => {
        axios.get(`http://localhost:9000/rating/${router?.query?.id}/${user.get()?.username}`)
            .then(res => setRating(res.data[0].rating_value))
    }

    useEffect(() => {
        getRating()
    }, [])

    return (
        <PrivateRoute>
            <h1>Rate Movie</h1>
            <Rate onChange={onRatingChange} value={rating} disabled={rating} />
            {rating && <p className={styles.text}>You already rated this movie.</p>}
        </PrivateRoute>
    );
};

export default RateMovie;
