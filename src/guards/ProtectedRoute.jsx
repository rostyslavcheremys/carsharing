import { Navigate } from "react-router-dom";

import { Loader } from "../components";

import { useAuth } from "../hooks";

import { AUTH, ADMIN, USER } from "../constants";

export const ProtectedRoute = ({
                                   children,
                                   adminOnly = false,
                                   userOnly = false,
                               }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader isLoading />;

    if (!user) {
        return <Navigate to={AUTH.LOGIN} replace />;
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to={USER.HOME} replace />;
    }

    if (userOnly && user.role !== "user") {
        return <Navigate to={ADMIN.DASHBOARD} replace />;
    }

    return children;
};