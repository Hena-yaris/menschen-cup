import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const ProtectedRoute= ({children,allowedRolles})=> {

    const {user,loading}= useContext(AuthContext);

    if(loading) return <div>loading...</div>

    if(!user) return <Navigate to= "/login" replace/>

    //Role
    if(allowedRolles && !allowedRolles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}