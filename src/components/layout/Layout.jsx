import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keyword" content={keyword} />
          <meta name="author" content={author} />

          <title>{title}</title>
        </Helmet>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

Layout.defaultProps = {
  title: "Outfit Shoppy - Ecommerce Shop",
  description: "Mern Stack Project",
  keyword: "Mern, react, node, mongo db ",
  author: "Abbas Gawali",
};

export default Layout;
