import {UserProvider} from "../core/context/GlobalContext";
import Header from "../core/components/Header";
import "../styles/globals.css"

const App = ({ Component, pageProps }) => {

    return (
        <UserProvider>
            <Header />
            <Component {...pageProps} />
        </UserProvider>
    );
};

export default App;
