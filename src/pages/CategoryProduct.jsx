import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios"; 
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("/Heromen.png");
  const params = useParams();

  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) {
      getproductByCategory();
    }
  }, [params?.slug]);

  const getproductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-category/${
          params.slug
        }`
      );
      setProducts(data?.products);
      setCategory(data?.category);

      if (data?.category.name === "Men") {
        setPhoto("/Heromen.png");
      } else if (data?.category.name === "Women") {
        setPhoto("/Herowomen.png");
      } else {
        setPhoto("/Herokid.png");
      }
 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Categories - Ecommerce"}>
      <div className="custompadding mt-4">
        <div className="banner row d-flex  align-items-center    ">
          <div className="content  col-md-8  ">
            <h1>FLAT 50% OFF </h1>
            <h4>
              Order Now For <span> Fast Delivery</span>
            </h4>
            <Link to={"/products"}>
              <div className="customBannerButton">Explore More</div>
            </Link>
          </div>
          <div className="content_img col-md-4">
            <img src={photo} alt="HeroImg" />
          </div>
        </div>
        <h4 className="text-start">{category?.name}'s Category</h4>
        <h5 className="text-start">Showing 1 - {products?.length} Products</h5>
        <div className="row">
          <div className="d-flex justify-content-center flex-wrap">
            {products?.map((item) => (
              <div key={item._id} className="card">
                <div className="img">
                  <img
                    src={`${
                      import.meta.env.VITE_API
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

export default CategoryProduct;
