import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from "axios";
import { toast } from 'react-toastify';

const Profile = () => {

    const [auth, setAuth] = useAuth();



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/auth/profile`, {
                name, email, password, phone, address 
            });

            if (data?.error) {
                toast.error(data.error);

            }

            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let localStore = localStorage.getItem("auth");
                localStore = JSON.parse(localStore);
                localStore.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(localStore));
                toast.success("Data Updated Successfully");
            }

        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong");
        }


    }
    useEffect(() => {
        const { name, email, phone, address } = auth.user;
        setPhone(phone);
        setName(name);
        setEmail(email);
        setAddress(address);
    }, [auth?.user])

    return (
        <Layout title={"Dashboard - My Profile"}>
            <div className="container-fluid custompadding py-4 my-4">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 mywidth">
                        <h2>My Profile</h2>

                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        name="email"
                                        value={email}
                                        disabled
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
                                        name="password"
                                        value={password}
                                        autoComplete="on"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>{" "}
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="custom-button btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </Layout >

    )
}

export default Profile