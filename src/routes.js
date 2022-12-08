import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { getItem } from './utils/storage';


function ProtectedRoutes({ redirectTo }) {
    const isAuth = getItem("token");

    return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}


function AllRoutes() {

    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname === "/") {
            navigate('/sign-in');
        }
    }, [])

    return (
        <Routes>

            <Route path="/">
                <Route path="/" element={<SignIn />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />

            <Route element={<ProtectedRoutes redirectTo={"/sign-in"} />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>
    )
}

export default AllRoutes;