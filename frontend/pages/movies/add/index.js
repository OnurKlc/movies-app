import AddMovieForm from "./AddMovieForm";
import PrivateRoute from "../../PrivateRoute";

const ProtectedRoute = () => <PrivateRoute><AddMovieForm /></PrivateRoute>

export default ProtectedRoute
