import ListMovies from "./ListMovies";
import PrivateRoute from "../../PrivateRoute";

const ProtectedRoute = () => <PrivateRoute><ListMovies /></PrivateRoute>

export default ProtectedRoute
