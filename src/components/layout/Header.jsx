import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../form/SearchInput";
import { useCategory } from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import ShopImg from "../../assets/ShopImgs/shop.ico";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("logout Success");
  };

  const [isActive, setIsActive] = useState(false);

  const setNav = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  custompadding">
        {/* <div className="container-fluid"> */}
        <div className="container-fluid pe-0 ps-0">
          <Link to={"/"} className="navbar-brand" href="#">
            <img src={ShopImg} width={"38px"} alt="" />
            Outfit Shoppy
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item lift" >
                <SearchInput />
              </li>

              <li className="nav-item">
                <Link to={"/products"} className="nav-link" href="#">
                  All Products
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to={"/category"} className="nav-link" href="#">
                  Category
                </Link>
              </li> */}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                >
                  Category
                </a>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to={`/categories`} className="dropdown-item">
                      All Categories
                    </Link>
                  </li>

                  {categories?.map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/category/${item.slug}`}
                        className="dropdown-item "
                         
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link to={"/cart"} className="nav-link" href="#">
                  <Badge showZero count={cart?.length}>
                    Cart 🛒
                  </Badge>
                </Link>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link" href="#">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link" href="#">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {(auth?.user?.name).toUpperCase()}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li onClick={handleLogout}>
                        <Link to={"/"} className="dropdown-item ">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
