import React from "react";
import Layout from "../components/layout/Layout";
import contactImg from "../assets/contact.jpg";
import { AiTwotoneMail } from "react-icons/ai";
import { FaPhoneVolume } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout>
      <div className="container   sub_container">
        <div className="custompadding">
          <div className="row">
            <div className="col-md m-auto">
              <div className="myImg">
                <img src={contactImg} alt="" />
              </div>
            </div>
            <div className="col-md">
              <button className="custom-button mt-4 mb-2">Contact Us</button>
              <p className="my-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
                neque molestiae quo sapiente tenetur eaque illum quod, id nam a
                magni, laudantium, dolore facilis asperiores magnam doloribus
                inventore voluptates optio!
              </p>
              <div className="contact_info">
                <p>
                  <AiTwotoneMail /> : eshophelp@ecom.com
                </p>
                <p>
                  <FaPhoneVolume /> : 012-345231
                </p>
                <p>
                  <BiSupport /> : 1800-000-000 (toll free){" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
