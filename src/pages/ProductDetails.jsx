import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/Cart";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productCategory, setProductCategory] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) {
      getProductDetails();
    }
  }, [params?.slug]);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data?.productResult);
      setProductCategory(data?.productResult.category.name);
      getSimilarProducts(
        data?.productResult._id,
        data?.productResult.category._id
      );
    } catch (error) {
      console.log(error);
      toast.error("Error fetching Product");
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching Similar Product");
    }
  };
  return (
    <Layout title={`${product?.name} - Ecommerce`}>
      <div className="custompadding mt-4">
        {/* <h1>Product Details </h1> */}
        <div className="row ">
          <div className="col-md-4 d-flex justify-content-start">
            {product._id && (
              <img
                style={{
                  objectFit: "contain",
                  maxHeight: "400px",
                  width: "100%",
                }}
                src={`${import.meta.env.VITE_API
                  }/api/v1/product/get-product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
            )}
          </div>
          <div className="col-md-8 productDetail">
            <h2>Product Details </h2>
            <h3 className="py-2">Name : {product?.name} </h3>
            <h5 className="productDescription"  >Description : {product?.description} </h5>
            <h4 >Price : <span className="spcol">{product?.price} ₹</span> </h4>
            <h5 className="py-2">Category : {productCategory} </h5>
            <button onClick={(e) => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, product])
              );
              toast("Item Added to Cart");
            }} className="btn btn-primary custom-button ">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="row">
          {/* {!relatedProducts ? (
            <> */}

          <h2 className="text-center">Similar Products</h2>
          {relatedProducts.length < 1 && (
            <h6 className="text-center">No Related Product Found</h6>
          )}


          {/* ---------------similar products -------------------- */}


          <div className="d-flex flex-wrap">
            {relatedProducts?.map((item) => (
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
                    className="productBtn"
                    onClick={() => navigate(`/product/${item.slug}`)}
                  >
                    Visit
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

export default ProductDetails;

{/* <div
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
      <h5 className="card-title">
        {item.name.length > 15
          ? item.name.substring(0, 30) + "..."
          : item.name}
      </h5>
      <p className="card-text">
        {" "}
        {item.description.length > 30
          ? item.description.substring(0, 70) + "..."
          : item.description}{" "}
      </p>
      <h5 className="card-title">Price : {item.price} RS</h5>

      <button className="btn btn-success" onClick={() => navigate(`/product/${item.slug}`)}
      >Visit</button>
    </div>
  </div> */}

