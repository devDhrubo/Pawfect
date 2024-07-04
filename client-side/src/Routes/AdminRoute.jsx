import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    console.log(loading, isAdminLoading)
    
    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }
    
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default AdminRoute;