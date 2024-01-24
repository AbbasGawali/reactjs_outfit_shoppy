import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);


  const getAllProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/api/v1/product/get-all-product`
    );

    if (data) {
      setProducts(data.productResult);
    }
    try {
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }; 
  //   lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);



  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
  //     );
  //     setProducts([...products, ...data?.products]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };



  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   }
  //   loadMore();
  // }, [page]);

 

  return (
    <Layout>
      <div className="container-fluid custompadding py-4 my-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 products-width">
            <h2 className="text-center  ">All Products</h2>
            <div className="d-flex flex-wrap">
              {products?.map((item) => (


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
                  <h4>Price : ₹ {item.price}</h4>

                  <div className="d-flex gap-2">
                    <button
                      className="btn "

                    >
                      <Link className="flex align-items-center gap-4 justify-content-center" style={{ border: "none", backgroundColor: "transparent", color: "black" }} to={`/dashboard/admin/product/${item.slug}`}>
                        Edit
                        <CiEdit />
                      </Link>
                    </button>


                  </div>
                </div>



              ))}
            </div>


            {/* load more  */}

            {/* 
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                  Load more
                </button>
              )}
              <h1>hell</h1>
            </div> */}


          </div>
        </div>






      </div>


    </Layout>
  );
};

export default Products;



{/* 

                <Link
                  
                  className="card m-2"
                  key={item._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    style={{
                      objectFit: "contain",
                      maxHeight: "200px",
                      width: "100%",
                    }}
                    src={`${import.meta.env.VITE_API
                      }/api/v1/product/get-product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <h5 className="card-title">Price : {item.price} RS</h5>
                  </div>
                </Link>
 */}
