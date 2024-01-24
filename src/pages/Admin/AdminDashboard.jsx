import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Admin"}>
      <div className="container-fluid custompadding py-4 my-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 products-width">
            <h2>User Name: {auth?.user?.name}</h2>
            <h2>User Email: {auth?.user?.email}</h2>
            <h2>User Contact: {auth?.user?.phone}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
