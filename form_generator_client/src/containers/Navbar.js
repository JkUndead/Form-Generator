import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo2.png";

const Navbar = () => (

    <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-default ">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                    <img src={Logo} alt="Logo" style={{ "maxHeight": "60px", "maxWidth": "inherit" }} />
                </Link>
            </div>


            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <span className="navbar-text">
                    Navbar text with an inline element
                </span>
            </div>
        </div>
    </nav>

);
export default Navbar;