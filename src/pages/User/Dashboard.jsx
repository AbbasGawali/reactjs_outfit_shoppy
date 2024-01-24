import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"User Dashboard - Ecommerce App"}>
      <div className="container-fluid custompadding py-4 my-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h2>User Name: {auth?.user?.name}</h2>
            <h2>User Email: {auth?.user?.email}</h2>
            <h2>User Contact: {auth?.user?.phone}</h2>
            <h2>User Address: {auth?.user?.address}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
