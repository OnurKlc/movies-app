import {createContext, useEffect, useState} from 'react';

export const GlobalContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [theatres, setTheatres] = useState([]);

    useEffect(() => {
        const userSession = JSON.parse(localStorage.getItem('user'))
        setUser(userSession)
    }, [])

    const values = {
        user: {
            get() {
                return user
            },
            set(val) {
                setUser(val)
            }
        },
        usersList: {
            getValue() {
                return users
            },
            setUsers,
            getSingleUser(val) {
                return users.find((user) => user.username === val)
            }
        },
        movies: {
            get() {
                return movies
            },
            set(val) {
                setMovies(val)
            }
        },
        platforms: {
            get() {
                return platforms
            },
            set(val) {
                setPlatforms(val)
            }
        },
        genres: {
            get() {
                return genres
            },
            set(val) {
                setGenres(val)
            }
        },
        theatres: {
            get() {
                return theatres
            },
            set(val) {
                setTheatres(val)
            }
        }
    }

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
};
