import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, role }) => {
    const currentUser = useSelector(state => state.user.user);
    if (!currentUser) {
        return <Navigate to='/auth' />
    }
    if (currentUser.role.toLowerCase() !== role) {
        if (currentUser.role === 'admin') {
            return <Navigate to="/admin" />
        }
        return <Navigate to='/' />
    }
    return element
}

export default ProtectedRoute;