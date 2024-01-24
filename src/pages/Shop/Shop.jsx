import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HeroImg from "../../assets/ShopImgs/heroImg1.png"; 
import "../../styles/Shop.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [popularInWomen, setPopularInWomen] = useState([]);
  const [popularInMen, setPopularInMen] = useState([]);
  const [popularInKids, setPopularInKids] = useState([]);
  const navigate = useNavigate();
  const getCategoryList = async () => {
    try {
      const popularInWomenData = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-limited-product/4/${import.meta.env.VITE_Womens_Category
        }`
      );
      if (popularInWomenData) {
        setPopularInWomen(popularInWomenData.data.productResult);
      }

      const popularInMenData = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-limited-product/4/${import.meta.env.VITE_Mens_Category
        }`
      );

      if (popularInMenData.data.productResult) {
        setPopularInMen(popularInMenData.data.productResult);
      }
      const popularInKidsData = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-limited-product/4/${import.meta.env.VITE_Kids_Category
        }`
      );

      if (popularInKidsData) {
        setPopularInKids(popularInKidsData.data.productResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <Layout>
      <div className="heroSection custompadding heroSection">
        <div className="row">
          <div className="col-md-6  d-flex justify-content-center   flex-column">
            <h5 className="heroSubHeading">New Arrivals Only</h5>
            <h1 className="heroHeading">
              New ✌️
              <br /> Collections <br />
              For Everyone
            </h1>

            <button className="heroBtn  ">Explore More</button>
          </div>
          <div className="col-md-6 heroImg d-flex justify-content-center align-items-center">
            <img src={HeroImg} alt="" />
          </div>
        </div>
      </div>

      <div className="heading text-center my-4 py-4">
        <h1>Popular In Women</h1>
        <div className="dash text-center"></div>
      </div>

      <div className="custompadding d-flex justify-content-center   wrapper ">
        {popularInWomen?.map((item) => (
          <div key={item._id} className="card pointer"
            onClick={() => navigate(`/product/${item.slug}`)}
          >
            <div className="img">
              <img
                src={`${import.meta.env.VITE_API
                  }/api/v1/product/get-product-photo/${item._id}`}
                alt={item.name}
              />
            </div>
            <h3>
              {item.name.length > 48
                ? `${item.name.substr(0, 48)}...`
                : item.name}
            </h3>
            <h4>Price : ₹ {item.price}</h4>
          </div>
        ))}
      </div>

      {/* men categories  */}

      <div className="heading text-center my-4 py-4">
        <h1>Popular In Men</h1>
        <div className="dash text-center"></div>
      </div>

      <div className="custompadding d-flex justify-content-center   wrapper ">
        {popularInMen?.map((item) => (
          <div onClick={() => navigate(`/product/${item.slug}`)}
            key={item._id} className="card pointer">
            <div className="img">
              <img
                src={`${import.meta.env.VITE_API
                  }/api/v1/product/get-product-photo/${item._id}`}
                alt={item.name}
              />
            </div>
            <h3>
              {item.name.length > 48
                ? `${item.name.substr(0, 48)}...`
                : item.name}
            </h3>
            <h4>Price : ₹ {item.price}</h4>
          </div>
        ))}
      </div>

      {/* kids categories  */}

      <div className="heading text-center my-4 py-4">
        <h1>Popular In Kids</h1>
        <div className="dash text-center"></div>
      </div>

      <div className="custompadding d-flex justify-content-center   wrapper ">
        {popularInKids?.map((item) => (
          <div onClick={() => navigate(`/product/${item.slug}`)}
            key={item._id} className="card pointer">
            <div className="img">
              <img
                src={`${import.meta.env.VITE_API
                  }/api/v1/product/get-product-photo/${item._id}`}
                alt={item.name}
              />
            </div>
            <h3>
              {item.name.length > 48
                ? `${item.name.substr(0, 48)}...`
                : item.name}
            </h3>
            <h4>Price : ₹ {item.price}</h4>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Shop;
