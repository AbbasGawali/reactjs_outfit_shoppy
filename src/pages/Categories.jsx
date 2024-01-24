import React from "react";
import Layout from "../components/layout/Layout";
import { useCategory } from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories - Ecommerce"}>
      <div className="custompadding mt-4">
        <h1>All Categories </h1>

        <div className="container">
          <div className="row d-flex flex-column">
            {categories.map((item) => (
              <Link key={item._id} to={`/category/${item.slug}`} className="custom-button my-4 text-center" style={{ width: "12rem" }}>
                {item.name}

              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
