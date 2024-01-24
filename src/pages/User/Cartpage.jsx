import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
const Cartpage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  // const removeItem = (pid) => {
  //   try {
  //     let myCart = [...cart];
  //     let indexOfRemovingItem = myCart.findIndex((item) => item._id === pid);
  //     myCart.splice(indexOfRemovingItem, 1);
  //     setCart(myCart);
  //     localStorage.setItem("cart", JSON.stringify(myCart));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   get total price

  // const getTotalPrice = () => {
  //   let total = 0;
  //   cart?.map((item) => {
  //     total = total + item.price;
  //   });
  //   return total.toLocaleString("en-IN", {
  //     currency: "INR",
  //   });
  // };


  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let indexOfRemovingItem = myCart.findIndex((item) => item._id === pid);
      myCart.splice(indexOfRemovingItem, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });

    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/braintree/token`
      );
     
      setClientToken(data?.clientToken); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Cart - Ecommerce"}>
      <div className="custompadding mt-4">
        <h1>
          {auth?.token && auth?.user?.name
            ? `Hello ${auth?.user?.name}`
            : "Hello User"}
        </h1>
        <h4>
          {" "}
          You Have {cart?.length} Items in your Cart,{" "}
          {cart?.length < 1 ? "Please Add Some Items In Cart" : ""}{" "}
          {!auth?.token && cart?.length > 0 ? "Please Login To Checkout" : ""}
        </h4>

        <div className="row">
          <div className="col-md-8">



            <div className="row">
              <div className="d-flex   flex-wrap">

                {cart?.map((item, index) => (




                  <div key={`${item._id}-${index}`} className="card">
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

                        onClick={() => removeItem(item._id)}

                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>






                ))}







              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center">
              <h2 className="text-center">Your Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <h4>Your Total : RS {getTotalPrice()} </h4>

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate("/dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      Cartpage(
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate("/dashboard/user/profile");
                          }}
                        >
                          Update Address
                        </button>
                      )
                    ) : (
                      <>
                        <button
                          className="custom-button"
                          onClick={() => {
                            navigate("/login", {
                              state: "/cart",
                            });
                          }}
                        >
                          Please Login to Checkout
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      disabled={loading || !instance || !auth?.user?.address}
                      className="btn btn-primary mb-4"
                      onClick={handlePayment}
                    >
                      {loading ? "processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;

 