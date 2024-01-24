import React, { useState } from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/layout/Layout";

import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Search = () => {
  const [values, setValues] = useSearch(); 
  return (
    <Layout title="Search Results">
      <div className="container">
        <div className="text-center my-4">
          <h1>Search Results</h1>
          <h6 className="text-start">
            {values?.results.length < 1
              ? "No Results Found"
              : `Found ${values?.results.length} Products`}
          </h6>

          <div className="d-flex flex-wrap justify-content-center">
            {values?.results.map((item) => (




              <div key={item._id} className="card">
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
                <h4 className="text-start">Price : ₹ {item.price}</h4>

                <div className="d-flex gap-2">
                  <button
                    className="productBtn"
                    onClick={() => navigate(`/product/${item.slug}`)}
                  >
                    Visit
                  </button>

                  <button
                    className="productBtn productCartBtn"
                    onClick={(e) => {
                      setCart([...cart, item]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, item])
                      );
                      toast("Item Added to Cart");
                    }}
                  >
                    <MdOutlineShoppingCartCheckout />
                  </button>
                </div>
              </div>


            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;



// <div
//                 className="card m-2"
//                 key={item._id}
//                 style={{ width: "18rem" }}
//               >
//                 <img
//                   style={{
//                     objectFit: "contain",
//                     maxHeight: "200px",
//                     width: "100%",
//                   }}
//                   src={`${
//                     import.meta.env.VITE_API
//                   }/api/v1/product/get-product-photo/${item._id}`}
//                   className="card-img-top"
//                   alt={item.name}
//                 />
//                 <div className="card-body">
//                   {/* <h5 className="card-title">{item.name.substring(0, 30)}</h5> */}
//                   <h5 className="card-title">
//                     {item.name.length > 15
//                       ? item.name.substring(0, 30) + "..."
//                       : item.name}
//                   </h5>
//                   <p className="card-text">
//                     {" "}
//                     {item.description.length > 30
//                       ? item.description.substring(0, 70) + "..."
//                       : item.description}{" "}
//                   </p>
//                   <h5 className="card-title">Price : {item.price} RS</h5>
//                   <button className="btn btn-primary me-4 my-4">Details</button>
//                   <button className="btn btn-success">Add To Cart</button>
//                 </div>
//               </div>
