import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/auth/orders`
      );
      setOrders(data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - My Orders"}>
      <div className="container-fluid custompadding py-4 my-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>
          <div className="col-md-9   ">
            <h2>My Orders</h2>
            <div className="products-width  ">
              <div className="border shadow tableScroll">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o, i) => {
                      return (
                        <tr key={o._id}>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="container">
                  {orders.map((order) => (
                    <div key={order._id} className="mb-4 p-2">

                      <div className="row">
                        <div className="d-flex flex-wrap">
                          {order.products.map((item) => (
                            <div key={item._id} className="card">
                              <div className="img">
                                <img
                                  src={`${
                                    import.meta.env.VITE_API
                                  }/api/v1/product/get-product-photo/${
                                    item._id
                                  }`}
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

// <div key={`${item._id}`} className="card">
//   <div className="img">
//     <img
//       src={`${import.meta.env.VITE_API
//         }/api/v1/product/get-product-photo/${item._id}`}
//       alt={item.name}
//     />
//   </div>
//   <h3>
//     {item.name.length > 48
//       ? `${item.name.substr(0, 48)}...`
//       : item.name}
//   </h3>
//   <h4>Price : ₹ {item.price}</h4>

// </div>

{
  /* <div key={product._id} className="row">
                        <div className="col-md-4">
                          <img
                            style={{
                              objectFit: "contain",
                              maxHeight: "100px",
                              width: "100%",
                            }}
                            src={`${
                              import.meta.env.VITE_API
                            }/api/v1/product/get-product-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <h4>{product.name}</h4>
                          <p>{product.description.substring(0, 30)}</p>
                          <h4>{product.price}</h4>
                        </div>
                      </div> */
}
