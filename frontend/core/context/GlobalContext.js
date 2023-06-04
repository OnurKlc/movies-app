import { createContext, useState } from 'react';
import axios from "axios";

// Create the UserContext
export const GlobalContext = createContext();

// Create a UserProvider component to wrap your app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [theatres, setTheatres] = useState([]);

    const values = {
        user: {
            getValue() {
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
            addUser(val) {
                setUsers([...users, val])
            },
            deleteUser(val) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.username !== val));
            },
            getSingleUser(val) {
                return users.find((user) => user.username === val)
            },
            updateUser(newUser) {
                const idx = users.findIndex((user) => user.username === newUser.username)
                users[idx] = newUser
                setUsers([...users])
            }
        },
        movies: {
            get() {
                return movies
            },
            set(val) {
                setMovies(val)
            },
            addMovie(val) {
                setMovies([...movies, val])
            },
            deleteMovie(val) {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.name !== val));
            },
            getSingleMovie(val) {
                return movies.find((movie) => movie.name === val)
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
