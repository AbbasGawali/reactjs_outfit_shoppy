import React from "react";
import Layout from "../components/layout/Layout";
import AboutImg from "../assets/about.jpg";
const About = () => {
  return (
    <Layout title={"About us - Ecommerce App"}>
      <div className="container   sub_container">
        <div className="custompadding">
          <div className="row">
            <div className="col-md m-auto">
              <div className="myImg">
                <img src={AboutImg} alt="" />
              </div>
            </div>
            <div className="col-md">
              <button className="custom-button mt-4 mb-2">About Us</button>
              <p className="my-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
                neque molestiae quo sapiente tenetur eaque illum quod, id nam a
                magni, laudantium, dolore facilis asperiores magnam doloribus
                inventore voluptates optio! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nihil dolorum dolore atque amet
                asperiores deleniti harum soluta inventore doloribus tempora.
                Ipsum magni molestiae ducimus voluptatum, maxime suscipit labore
                soluta at dolorum sequi inventore repellat tempore laborum
                quibusdam, recusandae ullam adipisci?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
