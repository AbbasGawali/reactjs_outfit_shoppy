import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

useAuth
const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth(); 

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user-auth`)

            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }


        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);


    return (

        ok ? <Outlet /> : <Spinner path="" />


    )
}

export default PrivateRoute;