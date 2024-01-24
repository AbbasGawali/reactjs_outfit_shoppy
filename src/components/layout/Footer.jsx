import React from "react";
import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="flinksrow  custompadding">
        <div className="wrapper">
          <div className="flinks">
            {" "}
            <Link to={"/"} href="#">
              <h3>
                Outfit Shoppy <CiShop />
              </h3>
            </Link>
            <p className="text-center">
              Shop the best and the latest trending clother that you want
              in Our Shop.
            </p>
          </div>

          <div className="flinks">
            <div className="flex flex-column">
              <h3>Links</h3>
              <p>
                <Link to={"/about"}>About</Link>
              </p>
              <p>
                <Link to={"/policies"}>Policies</Link>
              </p>
              <p>
                <Link to={"/contact"}>Contact</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="flinks">
            <h3>My Projects</h3>
            <div className="text-center">
              <p>
                {" "}
                <Link target="_blank" to={"https://abbastailwindreact1.netlify.app/"}>Web Design</Link>
              </p>
              <p>
                {" "}
                <Link target="_blank" to={"https://abbastodoapp.netlify.app/login"}>Todo Application</Link>
              </p>
              <p>
                {" "}
                <Link target="_blank" to={"https://abbasreactportfolio.netlify.app/"}>React</Link>
              </p>
            </div>
          </div>

          <div className="flinks">
            <h3>Social Links</h3>
            <div className="text-center">
              <p><Link target="_blank" to={"https://linkedin.com/in/abbasgawali/"}>Linkedin</Link></p>
              <p><Link target="_blank" to={"https://github.com/AbbasGawali"}>Github</Link></p>
              <p><Link target="_blank" to={"https://abbasreactportfolio.netlify.app/"}>Portfolio</Link></p>

            </div>
          </div>
        </div>
      </div>

      <div className="footer-my text-center p-2  ">
        &copy; Abbas Gawali All Rights Reserved 2024
      </div>
    </div>
  );
};

export default Footer;
