import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="page-not-found text-center">
        <p>Page Not Found</p>
        <h2>404</h2>
        <Link to={"/"}>
          <button className="custom-button">Go Home</button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
