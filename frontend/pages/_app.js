import {UserProvider} from "../core/context/GlobalContext";

const App = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
};

export default App;
