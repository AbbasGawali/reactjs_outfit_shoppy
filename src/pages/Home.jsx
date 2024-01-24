import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import "../styles/Shop.css";

import { MdOutlineShoppingCartCheckout } from "react-icons/md";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-all-product`
      );
      setProducts(data.productResult);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong fetching Products");
    }
  };

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  // get all category

  const getAllCategories = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (result?.data?.success) {
        setCategories(result.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // // get total count
  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/api/v1/product/product-count`
  //     );

  //     setTotal(data?.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // filter products by category

  const handleFilter = (val, id) => {
    let all = [...checked];
    if (val) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id); // Use !== to compare and filter correctly
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategories();
    // getTotal();
  }, []);

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while Fetching Products");
    }
  };

  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   }
  //   loadMore();
  // }, [page]);

  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`
  //     );
  //     // setProducts([...products, ...data?.products]);

  //     const newProducts = data?.products.filter(newProduct => !products.some(existingProduct => existingProduct._id === newProduct._id));

  //     setProducts([...products, ...newProducts]);
  //     // setProducts([...products, ...data?.products]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout title={"All Products - Best Deals"}>
      <div className="row my-4 custompadding w-100">
        <div className="col-md-3 ">
          <h5 className="">Filter By Category</h5>
          <div className="d-flex flex-column my-4">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* price Filter */}
          <h5 className="">Filter By Price</h5>
          <div className="d-flex flex-column my-4">
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            >
              {Prices.map((p) => (
                <div key={p._id} className="">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column w-50 w-md-100 my-4">
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h2 className="text-center">All Products</h2>

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
            {products.length > 0 ? (
              ""
            ) : (
              <p className="text-danger">No Products to Display</p>
            )}
          </div>
        </div>

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
            </button>
          )}
        </div> */}
      </div>
    </Layout>
  );
};

export default Home;
