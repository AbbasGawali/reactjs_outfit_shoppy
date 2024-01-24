import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import moment from "moment";

import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";

const { Options } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState();

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/auth/all-orders`
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );

      getOrders;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid custompadding py-4 my-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9 products-width">
            <h2>Manage Orders</h2>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow tableScroll" key={o._id}>
                  <table className="table">
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
                      <tr key={o._id}>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((status, index) => (
                              <Select.Option key={index} value={status}>
                                {status}
                              </Select.Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}


            <div className="container shadow my-4 py-4">
              {orders.map((order) => (



                <div key={order._id} className=" mb-4 p-2">
                  <div className="row">
                    <div className="d-flex flex-wrap">
                      {order.products.map((item) => (
                        <div key={item._id} className="card">
                          <div className="img">
                            <img
                              src={`${import.meta.env.VITE_API
                                }/api/v1/product/get-product-photo/${item._id
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
    </Layout>
  );
};

export default AdminOrders;



{/*                 
                  {order.products.map((product) => (
                    <div key={product._id} className="row">
                      <div className="col-md-4">
                        <img
                          style={{
                            objectFit: "contain",
                            maxHeight: "100px",
                            width: "100%",
                          }}
                          src={`${import.meta.env.VITE_API
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
                    </div>
                  ))} */}

