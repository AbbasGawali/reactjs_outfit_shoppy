import Layout from '../components/layout/Layout'
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`, {
                email, newPassword, answer
            });



            if (res.data.success) {
                toast.success(res.data.message);

                navigate("/login");
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
                <h2 className="my-4">Reset password</h2>
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
                            <label htmlFor="newPassword" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                required
                                name="newPassword"
                                value={newPassword}
                                autoComplete="on"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="answer" className="form-label">
                                Your Best Friend Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="answer"
                                required
                                name="answer"
                                value={answer}
                                autoComplete="on"
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>


                        <div className="d-grid my-4">
                            <button type="submit" className="custom-button btn btn-primary">
                                Submit
                            </button>
                        </div>

                        <p className="text-end">Know Password,
                            <span style={{ fontWeight: "bold", cursor: "pointer" }}
                                onClick={() => navigate("/login")}> Login Here</span></p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword