import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {

    const navigate = useNavigate();
    const [count, setCount] = useState(3);
    const location = useLocation();


    useEffect(() => { 
        const interval = setInterval(() => {
            setCount((preVal) => --preVal);
        }, 1000);

        if (count === 0) {
            navigate(`/${path}`, {
                state: location.pathname
            });

        }
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);



    return (
        < >
            <div className=" d-flex justify-content-center flex-column align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border" style={{ height: "4rem", width: "4rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h2 className='text-center'>Redirecting in {count} seconds</h2>
            </div>

        </>
    )
}

export default Spinner