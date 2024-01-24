import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();




  const handleSubmit = async (e) => {
    e.preventDefault(); 


    try {

      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`, {
        name, email, password, phone, address, answer
      });
 
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }

      else {
        toast.error(res.data.message);
      }

    } catch (error) {
      // console.log(error);
      toast.error("Somthing went wrong");
    }


  }



  return (
    <Layout>
      <div className="d-flex align-items-center my-4 py-4 px-4  flex-column">
        <h2 className="my-4">User Registration</h2>
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
                required
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

            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                What is Your Best Friend Name ?
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


            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phome
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
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
                required
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
    </Layout>
  );
};

export default Register;
