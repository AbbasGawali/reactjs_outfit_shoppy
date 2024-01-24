import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const Login = () => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`, {
                email, password
            });



            if (res.data.success) {



                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })

                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");


            }

            else {
                toast.error(res.data.message);
            }

        } catch (error) {

            toast.error(error.response.data.message);

        }


    }





    return (
        <Layout title={"Login - Ecommerce App"}>
            <div className="d-flex align-items-center my-4 py-4 px-4  flex-column">
                <h2 className="my-4">User Login</h2>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                required
                                name="password"
                                value={password}
                                autoComplete="on"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid my-4">
                            <button type="submit" className="custom-button btn btn-primary">
                                Submit
                            </button>
                        </div>

                        <p className="text-end">Forgot Password,
                            <span style={{ fontWeight: "bold", cursor: "pointer" }}
                                onClick={() => navigate("/forgotPassword")}> Reset It</span></p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login